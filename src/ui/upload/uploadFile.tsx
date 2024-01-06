"use client"

import { Box, Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { match } from "ts-pattern";
import { useUpload } from "./useUpload";
import { UploadIcon } from "@radix-ui/react-icons";

export const UploadFile = () => {
  const {openFilePicker, fileData: file, onClickUpload} = useUpload();

  return (<>
    <Box 
      style={{
        boxShadow: '0 0 10px rgba(171, 189, 249, 0.4)',
        borderRadius: '8%',
      }}
      p={'8'}
    >
      <Flex direction={'column'} justify={'center'} align={'center'} gap={'4'}>
        {match(file)
        .with({status: 'nothing'}, () => <>
          <SelectFile openFilePicker={openFilePicker}/>
        </>)
        .with({status: 'ERROR'}, (error) => <>
          <Text>{error.status}</Text>
          <Text>{error.message}</Text>
        </>)
        .with({status: 'selected'}, (data) => <>
          <Flex direction={'column'} justify={'center'} align={'center'} gap={'4'}>
            <Text>{data.name}</Text>
            <UploadFileButton upload={onClickUpload}/>
          </Flex>
        </>)  
        .exhaustive()}
      </Flex>
    </Box>
  </>);
}

const SelectFile = ({}: {openFilePicker: () => void}) => (<>
  <input type="file">
    <Button style={{cursor: 'pointer'}} variant={'surface'}>
      <Text>pick a file</Text>
    </Button>
  </input>
</>);

const UploadFileButton = ({upload}: {upload: () => void}) => {
  return (<>
    <IconButton onClick={upload} style={{cursor: 'pointer'}} variant={'surface'}>
      <UploadIcon />
    </IconButton>
  </>);
}