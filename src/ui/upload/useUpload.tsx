"use client";
import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { initFileShareUpload } from "~/server/api";

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
  const [fileData, setFileData] = useState<FileDataState>({ status: 'nothing' });
  const {
    openFilePicker, filesContent, errors, plainFiles,
  } = useFilePicker({
    multiple: false,
    validators: [
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
    ]
  });

  useEffect(() => {
    if (errors.length > 0) {
      errors.at(0)?.name;
      setFileData({ status: 'ERROR', message: errors.at(0)?.name ?? 'no-error-message' });
      return;
    }
    if (filesContent.length <= 0 || plainFiles.length <= 0) {
      return;
    }

    setFileData({
      status:   'selected', name: filesContent.at(0)?.name ?? '',
      size:     plainFiles.at(0)?.size ?? 0,
      content:  filesContent.at(0)?.content ?? '',
    });
    return;

  }, [filesContent, plainFiles, errors]);

  return {
    fileData,
    openFilePicker,
    onClickUpload: async () => {
      if (fileData.status !== 'selected') {
        return;
      }
      const owner = "carl@email.com"; // TODO - read value from user input
      const {uploadUrl} = await initFileShareUpload({ owner, fileName: fileData.name });
      
      const result = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob'
        },
        body: filesContent.at(0)?.content ?? ''
      })

      console.log(`Upload of file completed`);
      console.log(result);

      /*await completeFileShare({fileShareId: {
        slug,
        owner
      }});*/
    }
  };
};
