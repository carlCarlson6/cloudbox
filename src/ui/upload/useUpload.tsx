"use client";
import { useState } from "react";
import { completeFileShare, initFileShareUpload } from "~/server/api";

export type FileData = {
  status: 'selected';
  name: string;
  size: number;
  content: string;
}

export type FileDataState = 
  | FileData 
  | { status: 'ERROR'; message: string; } 
  | { status: 'nothing'; }

export const useUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [owner, setOwner] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const canSend = !(!file || owner === ''); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file) return;
    setFile(file);
  };
  
  const onClickUpload = async () => {
    if (!file || owner === '') {
      return;
    }
    setIsUploading(true);
  
    try {
      const { uploadUrl, slug } = await initFileShareUpload({ owner: owner, fileName: file.name });
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob'
        },
        body: await file.arrayBuffer(),
      });
      const { fileUrl, expiresOn } = await completeFileShare({fileShareId: { slug, owner: owner,}});
        } catch (error) {
      return;
    }
  }

  return {
    file,
    owner, 
    setOwner,
    canSend,
    handleFileChange,
    onClickUpload,
  };
};