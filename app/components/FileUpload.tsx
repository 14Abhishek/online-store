"use client"
import { IKUpload } from "imagekitio-next"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { useState } from "react"

export default function FileUpload(  { onSuccess }: { onSuccess:( response:IKUploadResponse ) => void}  ){
    const [uplaoding, setUploading ] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onError  = (err: {message: string}) =>{
        setError(err.message);
        setUploading(false)
    }

    const handleSucess = (response:IKUploadResponse) =>{
        setUploading(false);
        setError(null)
        onSuccess(response);
    }

    const handleStartUpload = () =>{
        setUploading(true);
        setError(null)
    }

    return (
        <div className="space-y-2">
            <IKUpload
            fileName="test-upload.png"
            onError={onError}
            onSuccess={handleSucess}
            onUploadStart={handleStartUpload}
            validateFile={(file:File)=>{
                const validTypes = ["image/png", "image/jpeg", "image/jpg"]
                if(!validTypes.includes(file.type)){
                    setError("Invalid file Type")
                }
                if(file.size > 5 *1024 *1024){
                    setError("File Too large");
                }
                return true;
            }}  
            />

            {uplaoding && (
                <p className="text-sm text-gray-500">Uploading...</p>
            )}

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

        </div>
    )
}

