"use client";
import { Box, Button, Code, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { FileIcon, FilePlusIcon, UploadIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import { SiMinutemailer } from "react-icons/si";
import { BarLoader } from "react-spinners";

export const SendFileForm = ({ file, ownerShip, onFileSelect, upload, isuploading }: {
  file: File | null;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ownerShip: {
    email: string;
    set: (email: string) => void;
  };
  upload: () => void;
  isuploading: boolean;
}) => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  return (<>
    <Flex direction={'column'} gap={'4'}>
      <TextField.Root>
        <TextField.Slot>
          <SiMinutemailer />
        </TextField.Slot>
        <TextField.Input
          placeholder="your email"
          value={ownerShip.email}
          onChange={e => ownerShip.set(e.target.value)} />
      </TextField.Root>
      {file === null
        ? <Button
          type={'button'}
          onClick={_ => inputFile.current?.click()}
          style={{ maxWidth: '100%', cursor: 'pointer'}}
        >
          <FilePlusIcon />
          <Text>select a file</Text>
          <input
            id="file-selector"
            type="file"
            onChange={onFileSelect}
            style={{ display: 'none' }}
            ref={inputFile} />
        </Button>
        : <FileData file={file}/>
      }
      {isuploading
        ? <Flex direction={'column'} justify={'center'} align={'center'} gap={'4'}>
          <Text>uploading your file</Text>
          <BarLoader color="#3E63DD" speedMultiplier={0.5} />
        </Flex>
        : <Button 
          disabled={file === null || ownerShip.email === '' } 
          style={{cursor: !(file === null || ownerShip.email === '') ? 'pointer' : ''}} 
          onClick={upload}
        >
          <UploadIcon />
        </Button>
      }

    </Flex>
  </>);
};

const FileData = ({file}: {file: File}) => (<>
  <Flex direction={'row'} gap={'6'}>
    <Box pl={'2'}>
      <FileIcon width={40} height={40} />
    </Box>
    <Flex direction={'row'} gap={'2'}>
      <Flex direction={'column'}>
        <Text size={'3'}>file name:</Text>
        <Text>size:</Text>
      </Flex>
      <Flex direction={'column'}>
        <Text size={'3'}><Code>{file.name}</Code></Text>
        <Text><Code>{fileSize(file.size)}</Code></Text>
      </Flex>
    </Flex>
  </Flex>
</>);

const fileSize = (fileSize: number) => `${fileSize/1024+""} KB`