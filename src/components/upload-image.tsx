"use client"

import { useUploadThing } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { useDropzone } from "@uploadthing/react"
import { Loader2, Upload, X } from "lucide-react"
import { ComponentProps, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import Image from "next/image"


type ImageUploadType = Omit<ComponentProps<"div">, "OnChange"> & {
  value?: string,
  onChange: (url: string)=> void,
  boxText?: string
}


export const ImageUpload = ({value,onChange,boxText,className, ...props}: ImageUploadType)=>{
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const {startUpload} = useUploadThing("imageUploader",{
    onClientUploadComplete: (res)=>{
      if (res && res[0]) {
        const url = res[0].ufsUrl
        setPreviewUrl(url)
        setIsUploading(false)
        onChange(url)
        toast.success("Upload successful!")
      }
      setIsUploading(false)
    }, onUploadError: (error)=>{
      toast.error(`Upload failed: ${error.message}`)
      setPreviewUrl(null)
      setIsUploading(false)
    }
  })

  const handleFileSelect = async (files:File[])=>{
    const file= files[0]
    if (!file) return;
    if(!file.type.startsWith("image/")){
      toast.error("Please select a valid image file.");
      return;
    }

    if(file.size > 5 * 1024 * 1024){
      toast.error("File size exceeds 5 MB limit.");
      return;
    }

    const reader = new FileReader()
    reader.onloadend = ()=> setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file)


    setIsUploading(true)
    await startUpload([file])
  }

  const {getInputProps,getRootProps,isDragActive} = useDropzone({
    onDrop: handleFileSelect,
    maxFiles: 1,
    disabled: isUploading,
  })

  const handleRemove = (e: React.MouseEvent)=>{
    e.stopPropagation()
    setIsUploading(false)
    setPreviewUrl(null)
    onChange("")
  }
  if (value || previewUrl)
    return (
      <div
      className={cn(
        "relative group overflow-hidden rounded-lg border-2 border-border",
        "w-full h-48",
        className
      )}
      {...props}
    >
     <Image
  src={previewUrl || value || ""}
  alt="Uploaded image"
  fill
  unoptimized
  className="object-cover"
/>

        {isUploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
              <p className="text-sm text-white font-medium">Uploading...</p>
            </div>
          </div>
        )}

        {!isUploading && (
          <div
            {...getRootProps()}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 "
          >
            <input {...getInputProps()}   ref={inputRef} />
            <Button
            className="cursor-pointer"
              type="button"
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                inputRef.current?.click() 
              }}
            >
              <Upload className="w-4 h-4 mr-2"  />
              Change
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        )}
      </div>
    );


   return (
    <div
      {...getRootProps()}
      className={cn(
        "relative h-full min-h-40 border-2 border-dashed rounded-lg",
        "flex flex-col items-center justify-center text-center",
        "cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50",
        isUploading && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
          <Upload className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">
          <span className="text-primary">Browse photo</span> or drop here
        </p>
        {boxText && (
          <p className="text-xs text-muted-foreground text-center px-4 max-w-xs">
            {boxText}
          </p>
        )}
      </div>
    </div>
  );
}