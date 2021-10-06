import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestFetchContact } from "./contactSaga";

const Contact = () => {

  const contact = useSelector((state: RootState) => state.contact);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(dispatch);
    console.log(contact.isFetched);

    if (!contact.isFetched) {
      dispatch(requestFetchContact());
    }
  }, [dispatch, contact.isFetched]);

  return (
    <div style={{ width: "60vw" }} className="mx-auto">
      <h2 className="text-center my-5">Contact</h2>
      <div className="d-flex justify-content-end my-2">
        <button
          className="btn btn-secondary me-2"
          onClick={() => {
            dispatch(requestFetchContact());
          }}
        >
          새로고침
          <i className="bi bi-arrow-counterclockwise ms-2"></i>
        </button>

        <button
          className="btn btn-primary"
          onClick={() => {
            history.push("/contacts/ContactCreate");
          }}
        >
          추가
          <i className="bi bi-plus ms-2"></i>
        </button>
      </div>

      <table className="table table-hover my-5">
        <thead>
          <tr>
            <th>#</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
          {contact.data.map((item) => (
            <tr
              key={item.id}
              onClick={() => {
                history.push(`/contacts/ContactDetail/${item.id}`);
              }}
            >
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.createdTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contact;