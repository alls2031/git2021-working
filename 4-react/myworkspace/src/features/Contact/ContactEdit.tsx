import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { AppDispatch, RootState } from "../../store";
import { modifyContact } from "./contactSlice";

const ContactEdit = () => {
  const { id } = useParams<{ id: string }>();

  const contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const nameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const memoInput = useRef<HTMLTextAreaElement>(null);

  const handleSaveClick = () => {
    if (contactItem) {
      const item = { ...contactItem };
      item.name = nameInput.current ? nameInput.current.value : "";
      item.phone = phoneInput.current ? phoneInput.current.value : "";
      item.email = emailInput.current ? emailInput.current.value : "";
      item.createdTime = new Date().toLocaleTimeString();
      dispatch(modifyContact(item));
      history.push("/contacts");
    }
  };

  return (
    <div>
      (
      <div style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center">Contact Create</h2>
        <form>
          <table className="table">
            <tbody>
              <tr>
                <th>이름</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    ref={nameInput}
                    defaultValue={contactItem?.name}
                  />
                </td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    ref={phoneInput}
                    defaultValue={contactItem?.phone}
                  />
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    ref={emailInput}
                    defaultValue={contactItem?.email}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div>
          <button
            className="btn btn-secondary float-start"
            onClick={() => {
              history.push("/contacts");
            }}
          >
            <i className="bi bi-grid-3x3-gap me-1"></i>
            목록
          </button>
          <button
            className="btn btn-primary float-end"
            onClick={() => {
              handleSaveClick();
            }}
          >
            <i className="bi bi-check" />
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactEdit;