
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageLazyProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function ImageLazy({
  src,
  alt,
  aspectRatio = "auto",
  objectFit = "cover",
  className,
  ...props
}: ImageLazyProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    setIsLoaded(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      // Set a placeholder or fallback image
      setImageSrc("/placeholder.svg");
      setIsLoaded(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[16/9]",
    auto: "",
  };

  const objectFitClasses = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  };

  return (
    <div className={cn(
      "overflow-hidden relative",
      aspectRatioClasses[aspectRatio],
      className
    )}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        className={cn(
          "w-full h-full transition-opacity duration-300",
          objectFitClasses[objectFit],
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        {...props}
      />
    </div>
  );
}
