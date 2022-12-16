import { useState } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface IFileDrop {
  setFiles: (files: File[]) => void;
  type?: string;
  message: string;
  files: File[];
  multiple?: boolean;
  accept?: Accept;
  preview?: boolean;
  defaultImage?: string;
}
export function FileDrop(props: IFileDrop) {
  const [images, setImages] = useState(props.files);
  const { message, setFiles, multiple, accept, preview, defaultImage } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      setImages(files);
      setFiles(files);
    },
    multiple,
    accept,
  });
  let ImageUrl = "";
  if (images.length > 5000000) {
    ImageUrl = URL.createObjectURL(images[0]);
  }
  const removeFile = (file: any) => () => {
    const newFiles = [...props.files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setImages(newFiles);
  };

  return (
    <section className="container  p-2  ">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="d-flex justify flex-column">
          <div className="dz-message needsclick">
            <h4 className=" d-flex justify-content-center">{message}</h4>
          </div>
        </div>
      </div>
      {images?.map((item: any, fileIndex) => {
        const extn = item.name.split(".").pop();
        return (
          <div className="border rounded">
            <div className="d-flex p-2">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm bg-light rounded">
                  <img
                    className="img-fluid rounded d-block"
                    src={
                      extn === "csv"
                        ? "/assets/csv.png"
                        : URL.createObjectURL(item)
                    }
                    style={{ width: "-webkit-fill-available" }}
                    alt="d-img"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5 className="fs-14 mb-1" data-dz-name>
                  {item.name}
                  &nbsp;
                </h5>
                <button
                  style={{ height: "30px" }}
                  type="button"
                  data-dz-remove
                  className="btn btn-sm btn-danger"
                  onClick={removeFile(fileIndex)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
