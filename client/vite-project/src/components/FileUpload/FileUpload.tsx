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
            <div className="mb-3 d-flex justify-content-center">
              {defaultImage ? (
                <img
                  className="img-fluid rounded d-block"
                  src={`http://116.202.10.98:8000/${defaultImage}`}
                  alt="d-img"
                />
              ) : images.length > 0 && preview ? (
                <img
                  className="img-fluid rounded d-block"
                  src={ImageUrl}
                  alt="d-img"
                />
              ) : (
                <i className="display-4 text-muted ri-upload-cloud-2-fill"></i>
              )}
            </div>

            <h4 className=" d-flex justify-content-center">{message}</h4>
          </div>
        </div>
      </div>
      {images?.map((item: any, fileIndex) => {
        const extn = item.name.split(".").pop();
        return (
          <ul className="list-unstyled mb-0" id="dropzone-preview">
            <li className="mt-2" id="dropzone-preview-list">
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
                        alt="d-img"
                      />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="pt-1">
                      <h5 className="fs-14 mb-1" data-dz-name>
                        {item.name}
                        &nbsp;
                      </h5>
                      <p className="fs-13 text-muted mb-0" data-dz-size>
                        {item.size}
                      </p>
                      <strong
                        className="error text-danger"
                        data-dz-errormessage
                      ></strong>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ms-3">
                    <button
                      type="button"
                      data-dz-remove
                      className="btn btn-sm btn-danger"
                      onClick={
                        removeFile(fileIndex)
                        // () =>
                        // setFiles(
                        //   props.files.filter((item, index) => {
                        //     return index != fileIndex;
                        //   })
                        // )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        );
      })}
    </section>
  );
}
