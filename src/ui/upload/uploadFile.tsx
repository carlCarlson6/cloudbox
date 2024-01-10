"use client"

import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { useUpload } from "./useUpload";
import { UploadIcon } from "@radix-ui/react-icons";
import { match } from "ts-pattern";
import { BarLoader } from "react-spinners";
import { FILE } from "dns";
import { SendFileForm } from "./SendFileForm";

export const UploadFile = () => {
  const { onClickUpload, handleFileChange, owner, setOwner, file } = useUpload();

  console.log(file);

  return (<>
    <Box 
      style={{
        boxShadow: '0 0 10px rgba(171, 189, 249, 0.4)',
        borderRadius: 'var(--radius-6)',
      }}
      p={'8'}
    >
      <Flex direction={'column'} justify={'center'} align={'center'} gap={'4'}>
        {match(uploadStatus)
          .with({status: 'MISSING_DATA'}, () => <>
            <SendFileForm 
              file={file}
              onFileSelect={handleFileChange}
              ownerShip={{ email: owner, set: setOwner }}
              upload={onClickUpload}
              isuploading={false}
            />  
          </>)          
          .with({status: 'UPLOADING'}, () => <>
            <SendFileForm 
              file={file}
              onFileSelect={handleFileChange}
              ownerShip={{ email: owner, set: setOwner }}
              upload={onClickUpload}
              isuploading={true}
            />            
          </>)
          .with({status: 'UPLOAD_COMPLETED'}, state => <>
            <FileUploadCompletion 
              fileUrl={state.fileUrl} 
              experisOn={state.expiresOn}
            />
          </>)
          .with({status: 'ERROR'}, data => <>
            <Text>error - {data.message}</Text>
          </>)
          .exhaustive()
        }
      </Flex>
    </Box>
  </>);
}

const Uploading = () => (<>
  <Flex direction={'column'} justify={'center'} align={'center'} gap={'4'}>
    <Text>uploading your file</Text>
    <BarLoader color="#3E63DD" speedMultiplier={0.5} />
  </Flex>
</>);

const FileUploadCompletion = ({fileUrl, experisOn}: {fileUrl: string, experisOn: Date}) => (<>
  <Flex direction={'column'}>
    <Text>{fileUrl.toString()}</Text>
    <Text>{experisOn.toISOString()}</Text>
  </Flex>
</>);