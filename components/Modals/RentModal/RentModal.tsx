'use client'
import { FC, useMemo, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog"
import useRentModal from '@/hooks/useRentModal'
import { Button } from '../../ui/button'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { filterHeaderData } from '@/constants/filterHeader'
import MapCategrories from './MapCategrories'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import SelectCountries from '@/components/shared/SelectCountries'
import dynamic from 'next/dynamic'
import Counter from '@/components/shared/Counter'
import ImageUploader from './ImageUpload'
import { Input } from '../../ui/input'
import { toast } from '@/components/ui/use-toast'
import axios, { AxiosError } from 'axios'
import { useEdgeStore } from '@/lib/edgeStore'
import { redirect } from 'next/navigation'


interface RentModalProps {

}

const RentModal: FC<RentModalProps> = ({ }) => {


    enum STEPS {
        CATEGORY = 0,
        LOCATION = 1,
        INFO = 2,
        IMAGES = 3,
        DESCRIPTION = 4,
        PRICE = 5,
    }

    const RentModal = useRentModal()
    const [steps, setsteps] = useState(STEPS.CATEGORY)
    const [IsLoading, setIsLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            image: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const image = watch('image')

    const setCustomValue = (id: any, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const Map = useMemo(() => dynamic(() => import('./MapIntegration'), {
        ssr: false,
    }), [location])


    const onBack = () => {
        setsteps(value => value - 1)
    }
    const onNext = () => {
        setsteps(value => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (steps === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [steps])

    const secondaryActionLabel = useMemo(() => {
        if (steps === STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    }, [steps])

    const { edgestore } = useEdgeStore()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (STEPS.PRICE !== steps) {
            return onNext()
        }

        for (const key in data) {
            if (!data[key]) {
                return toast({
                    title: 'please fill all the fields!',
                    description: 'All the fields are mandatory to fill',
                    variant: 'destructive'
                })
            }
        }

        try {
            setIsLoading(true)
            const imageUrl = await edgestore.publicFiles.upload({
                file: image,
                options: {
                    temporary: true,
                }
            })

            const updateData = {
                ...data,
                price: Number(data?.price),
                location: data?.location?.label,
                image: imageUrl?.url
            }

            if (imageUrl?.url) {
                const { status, data } = await axios.post('/api/listing/create', {
                    ...updateData,
                })

                if (status === 200) {
                    setsteps(STEPS.CATEGORY)
                    reset(),
                        RentModal.closeRentModal()
                    await edgestore.publicFiles.confirmUpload({
                        url: imageUrl?.url,
                    });
                    setIsLoading(false)
                    return toast({
                        description: "Listing Created Succefully ✨",
                    })
                }
            } else {
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            if (err instanceof AxiosError) {
                if (err?.response?.status === 401) {
                    return toast({
                        title: 'Please Sign-in first',
                        description: 'Unauthorized user',
                        variant: "destructive",
                        action: <Button onClick={() => redirect('/sign-in')} variant="destructive" >Sign-in</Button>
                    })
                } else if (err?.response?.status === 402) {
                    return toast({
                        title: 'please fill all fields',
                        description: 'All the fields are necessary',
                        variant: 'destructive'
                    })
                }

                return toast({
                    title: 'Server Error',
                    description: 'Please try again later.',
                    variant: 'destructive',
                })

            }
        } finally {
            setIsLoading(false)
        }

    }


    let bodyContent;

    if (STEPS.CATEGORY === steps) {
        bodyContent = (
            <>
                <DialogHeader>
                    <DialogTitle className='text-black font-semibold antialiased'>Which of these best describes your place ?</DialogTitle>
                    <DialogDescription className='text-gray-700 font-normal text-sm antialiased'>
                        Pick a Category
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full grid grid-cols-2 gap-3 h-auto max-h-[15rem] overflow-y-scroll" >
                    {filterHeaderData?.map(data => {
                        return (
                            <MapCategrories onClick={(categoryData) => setCustomValue('category', categoryData)} key={data?.id} {...data} categoryLabel={category} />
                        )
                    })}
                </div>
            </>
        )
    }

    if (STEPS.LOCATION === steps) {
        bodyContent = (
            <>
                <DialogHeader>
                    <DialogTitle className='text-black font-semibold antialiased'>Where is you place located?</DialogTitle>
                    <DialogDescription className='text-gray-700 font-normal text-sm antialiased'>
                        Help guests find you!
                    </DialogDescription>
                </DialogHeader>
                <SelectCountries onChange={(value) => setCustomValue('location', value)} />
                <Map center={location?.latIng} />
            </>
        )
    }

    if (STEPS.INFO === steps) {
        bodyContent = (
            <>
                <DialogHeader>
                    <DialogTitle className='text-black font-semibold antialiased'>Share some basics about your place</DialogTitle>
                    <DialogDescription className='text-gray-700 font-normal text-sm antialiased'>
                        What amenitis do you have?
                    </DialogDescription>
                </DialogHeader>
                <Counter
                    onChange={(value) => setCustomValue('guestCount', value)}
                    value={guestCount}
                    title="Guests"
                    subtitle="How many guests do you allow?"
                />
                <hr />
                <Counter
                    onChange={(value) => setCustomValue('roomCount', value)}
                    value={roomCount}
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                />
                <hr />
                <Counter
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                    value={bathroomCount}
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                />
            </>
        )
    }

    if (STEPS.IMAGES === steps) {
        bodyContent = (
            <>
                <DialogHeader>
                    <DialogTitle className='text-black font-semibold antialiased'>Add a photo of your place</DialogTitle>
                    <DialogDescription className='text-gray-700 font-normal text-sm antialiased'>
                        Show guests what your place looks like!
                    </DialogDescription>
                </DialogHeader>
                <ImageUploader isFile={image} onChange={(file) => setCustomValue('image', file)} />
            </>
        )
    }

    if (STEPS.DESCRIPTION === steps) {
        bodyContent = (
            <>
                <DialogHeader>
                    <DialogTitle className='text-black font-semibold antialiased'>How would you describe your place?</DialogTitle>
                    <DialogDescription className='text-gray-700 font-normal text-sm antialiased'>
                        Short and sweet works best!
                    </DialogDescription>
                </DialogHeader>
                <Input type='text' className='p-2' placeholder='title' id='title' {...register('title')} />

                <Input type='text' className='p-2' placeholder='description' id='description' {...register('description')} />
            </>
        )
    }

    if (STEPS.PRICE === steps) {
        bodyContent = (
            <>
                <DialogHeader>
                    <DialogTitle className='text-black font-semibold antialiased'>Now, set your price</DialogTitle>
                    <DialogDescription className='text-gray-700 font-normal text-sm antialiased'>
                        How much do you charge per night?
                    </DialogDescription>
                </DialogHeader>
                <Input type='number' className='p-2' placeholder='price' id='price' {...register('price')} />
            </>
        )
    }


    return <Dialog open={RentModal?.isOpen} onOpenChange={RentModal.closeRentModal}>
        <DialogContent className="sm:max-w-[500px]">
            <form className='flex flex-col gap-3' id="rentModalForm" onSubmit={handleSubmit(onSubmit)}>
                {bodyContent}
            </form>
            <DialogFooter className='mt-2 flex flex-col md:flex-row gap-3 items-center'>
                {STEPS.CATEGORY === steps ? undefined : <Button variant="outline" className={'w-full border-black hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50'} disabled={IsLoading} onClick={onBack}>
                    {secondaryActionLabel}
                </Button>}
                <Button isLoading={IsLoading} form="rentModalForm" className='w-full ' type='submit' >
                    {IsLoading ? 'uploading data!' : actionLabel}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

export default RentModal