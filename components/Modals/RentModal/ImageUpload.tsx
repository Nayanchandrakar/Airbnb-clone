'use client'
import { FC } from 'react'
import { SingleImageDropzone } from '@/components/upload/single-image'

interface ImageUploadProps {
    onChange: (value: any) => void,
    isFile: any,
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, isFile }) => {

    console.log(isFile)

    return (
        <div className="w-full h-full mt-2">
            <SingleImageDropzone
                height={200}
                width={200}
                value={isFile}
                onChange={onChange}
                dropzoneOptions={{
                    maxSize: 2000000, // 2 MB
                }}
            />
        </div>
    )
}

export default ImageUpload