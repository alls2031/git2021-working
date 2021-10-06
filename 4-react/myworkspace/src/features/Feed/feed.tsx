import { useRef, useState } from "react";

import produce from "immer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import style from "../profile/Profile.module.scss";
import FeedEditModal from "./FeedEditModal";
import { FeedItemState } from "./type/index1";


const getTimeString = (unixTime: number) => {
  const dateTime = new Date(unixTime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Feed = () => {
  const [feedList, setFeedList] = useState<FeedItemState[]>([]);
  const profile = useSelector((state: RootState) => state.profile);

  const [isEdit, setIsEdit] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const add = () => {
    if (inputRef.current?.files?.length) {
      const file = inputRef.current?.files[0];
      const fileType = file.type;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const inputText = textRef.current?.value;

      reader.onload = () => {
        const baseUrl = reader.result;
        console.log(typeof baseUrl);

        const feed: FeedItemState = {
          id: feedList.length > 0 ? feedList[0].id + 1 : 1,
          text: inputText,
          url: baseUrl?.toString(),
          createTime: new Date().getTime(),
          type: fileType,
          img: profile.image,
        };
        setFeedList([feed, ...feedList]
        );
      };
      formRef.current?.reset();
    }
  };

    const remove = (id: number) => {
    setFeedList(feedList.filter((item) => item.id !== id));
  };

    const editItem = useRef<FeedItemState>({
    id: 0,
    url: "",
    type: "",
    text: "",
    createTime: 0,
    username: "",
    img: "",
  });

    const edit = (item: FeedItemState) => {
    editItem.current = item;
    setIsEdit(true);
  };

  const handleSave = (editItem: FeedItemState) => {
    setFeedList(
      produce((state) => {
        const item = state.find((item: FeedItemState) => item.id === editItem.id);
        if (item) {
          item.url = editItem.url;
          item.text = editItem.text;
          item.type = editItem.type;
        } else if (!editItem.url) {
          return;
        }
      })
    );
    setIsEdit(false);
  };

  return (
    <>
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-5">Feed</h2>
      {isEdit && (
        <FeedEditModal
          item={editItem.current}
          onClose={() => {
            setIsEdit(false);
          }}
          onSave={(editItem) => {
            handleSave(editItem);
          }}
        />
      )}
      <form ref={formRef} id="form">
        <textarea
          style={{ boxSizing: "border-box", marginBottom: "10px" }}
          className="form-control"
          aria-label="With textarea"
          placeholder="Leave a post here"
          ref={textRef}
        ></textarea>
        <input
          className="form-control"
          aria-label="Upload"
          type="file"
          accept="image/png, image/jpeg, video/mp4"
          ref={inputRef}
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
      </form>
      {feedList.map((item) =>
        item.type === "video/mp4" ? (
          <div key={item.id} className="card">
            <div className="card-header">
            <div
              className={`${style.thumb} me-1`}
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>
              <span className={`${style.username}`}>{item.username}</span>
            </div>
            <video controls>
              <source src={item.url} type="video/mp4"></source>
            </video>
            <p className="card-text">{item.text}</p>
            <span className="w-100">
              {getTimeString(
                item.modifyTime ? item.modifyTime : item.createTime
              )}
            </span>
            <a
                onClick={() => {
                  edit(item);
                }}
                href="#!"
                className="link-secondary fs-6 float-end text-nowrap me-2"
              >
                수정
            </a>
            <a
              onClick={() => {
                remove(item.id);
              }}
              href="#!"
              className="link-secondary fs-6 float-end text-nowrap me-2"
            >
              삭제
            </a>
          </div>
        ) : (      
          <div className="card-header">
            <div
              className={`${style.thumb} me-1`}
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>
            <span className={`${style.username}`}>{item.username}</span>       
            <div key={item.id} className="card"></div>
              <img src={item.url} className="card-img-top" alt="..." />
              <p className="card-text">{item.text}</p>
              <div className="card-body d-flex">
                <span className="w-100">
                  {getTimeString(
                    item.modifyTime ? item.modifyTime : item.createTime
                  )}
                </span>
                <a
                onClick={() => {
                  edit(item);
                }}
                href="#!"
                className="link-secondary fs-6 float-end text-nowrap me-2"
              >
                수정
              </a>
                <a
                  onClick={() => {
                    remove(item.id);
                  }}
                  href="#!"
                  className="link-secondary fs-6 float-end text-nowrap me-2"
                >
                  삭제
                </a>
              </div>
          </div>
        )
      )}
      </div>
    </>
  );
};

export default Feed;