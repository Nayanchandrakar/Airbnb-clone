'use client';

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import HeadingShortner from "./HeadingShortner";



interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters.",
    showReset
}) => {
    const router = useRouter();

    return (
        <div
            className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
        >
            <HeadingShortner
                className={{
                    divclassName: "flex flex-col justify-center items-center w-full"
                }}
                titleLabel={title}
                subTitleLabel={subtitle}
            />

            {showReset && (
                <Button
                    className="mt-2 border-black"
                    variant="outline"
                    onClick={() => router.push('/')}
                >Remove all filters</Button>
            )}
        </div>
    );
}

export default EmptyState;