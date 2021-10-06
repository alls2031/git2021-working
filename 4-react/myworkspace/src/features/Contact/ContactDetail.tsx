import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { AppDispatch, RootState } from "../../store";
import { removeContact } from "./contactSlice";

const ContactDetail = () => {
  const { id } = useParams<{ id: string }>();

  const contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );

  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const handDeleteClick = () => {
    dispatch(removeContact(+id));
    history.push("/contacts");
  };

  return (
    <div>
      <div style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center">Contact Detail</h2>
        {!contactItem && (
          <div className="text-center my-5">데이터가 없습니다.</div>
        )}
        {contactItem && (
          <form>
            <table className="table">
              <tbody>
                <tr>
                  <th>이름</th>
                  <td>{contactItem?.name}</td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>
                    <td>{contactItem?.phone}</td>
                  </td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>{contactItem?.email}</td>
                </tr>

              </tbody>
            </table>
          </form>
        )}
        <div className="d-flex">
          <div style={{ width: "50%" }}>
            <button
              className="btn btn-secondary me-1 float-start"
              onClick={() => {
                history.push("/contacts");
              }}
            >
              <i className="bi bi-grid-3x3-gap me-1"></i>
              목록
            </button>
          </div>
          <div style={{ width: "50%" }} className="d-flex justify-content-end">
            <button
              className="btn btn-primary me-1"
              onClick={() => {
                history.push(`/contacts/edit/${id}`);
              }}
            >
              <i className="bi bi-pencil me-1" />
              수정
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                handDeleteClick();
              }}
            >
              <i className="bi bi-trash me-1" />
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;