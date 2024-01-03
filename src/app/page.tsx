import { Flex, Text } from "@radix-ui/themes";
import { FileUploader } from "react-drag-drop-files";
import { initFileShareUpload } from "~/server/api";
import { UploadFile } from "~/ui/uploadFile";

export default async function Home() {
  const {uploadUrl, slug} = await initFileShareUpload({
    userEmail: "carl@email.com",
    fileName: "file.txt"
  });
  return (
    <Flex direction={'column'} gap={'4'}>
      <Text>hello world</Text>
      <Text>{slug}</Text>
      <Text>{uploadUrl}</Text>
      <UploadFile />
    </Flex>
  );
}
