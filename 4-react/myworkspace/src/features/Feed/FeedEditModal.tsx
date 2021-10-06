import { useRef, useState } from "react";
import { FeedItemState } from "./type/index1";

interface MadalProp {
  item: FeedItemState;
  onClose: () => void;
  onSave: (editItem: FeedItemState) => void;
}

const FeedEditModal = ({ item, onClose, onSave }: MadalProp) => {
  const [isChange, setIsChange] = useState(false);
  const [urls, setUrls] = useState(item.url);
  const [type, setType] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const add = () => {
    if (fileRef.current?.files?.length) {
      const file = fileRef.current?.files[0];
      const fileType = file.type;
      setType(fileType);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const baseUrl = reader.result;
        const url = baseUrl?.toString();
        setUrls(url);
        setIsChange(true);
      };
    }
  };

  const save = (urls: string | undefined) => {
    const feed: FeedItemState = {
      id: item.id,
      text: inputRef.current?.value,
      createTime: item.createTime,
      url: urls,
      type: type,
      username: item.username,
    };
    onSave(feed);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => {
        onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Edit Feed</h3>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                onClose();
              }}
            ></button>
          </div>
          <div className="modal-body" key={item.id}>
            <div className="input-group">
              <input
                className="form-control"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                type="file"
                accept="image/png, image/jpeg, video/mp4"
                ref={fileRef}
              />
              <button
                onClick={() => {
                  add();
                }}
                className="btn btn-primary"
                type="button"
              >
                입력
              </button>
            </div>
            {isChange === false ? (
              item.type === "video/mp4" ? (
                <video controls>
                  <source src={urls} type="video/mp4"></source>
                </video>
              ) : (
                <img src={urls} className="card-img-top" alt="..." />
              )
            ) : type === "video/mp4" ? (
              <video controls>
                <source src={urls} type="video/mp4"></source>
              </video>
            ) : (
              <img src={urls} className="card-img-top" alt="..." />
            )}

            <input
              type="text"
              className="w-100"
              defaultValue={item.text}
              ref={inputRef}
            />
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                onClose();
              }}
              type="button"
              className="btn btn-secondary"
            >
              닫기
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                save(urls);
              }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedEditModal;