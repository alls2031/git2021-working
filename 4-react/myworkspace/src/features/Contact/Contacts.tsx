import produce from "immer";
import React, { useEffect, useRef, useState } from "react";
import contactApi from "./contactApi";
import api from "./contactApi";

interface InputItemState {
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  id: number;
  isEdit?: boolean;
}

const Contect = () => {
  const [user, setUser] = useState<InputItemState[]>([]);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputNumRef = useRef<HTMLInputElement>(null);
  const inputMailRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const fetchData = async () => {
    const res = await api.fetch();

    const contacts = res.data.map((item) => ({
      name: item.name,
      id: item.id,
      phone: item.phone,
      email: item.email,
    })) as InputItemState[];

    setUser(contacts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const add = async () => {
    if (inputNameRef.current && inputNumRef.current && inputMailRef.current) {
      const nameValue = inputNameRef.current.value;
      const numValue = inputNumRef.current.value;
      const mailValue = inputMailRef.current.value;

      const result = await contactApi.add({
        name: nameValue,
        phone: numValue,
        email: mailValue,
      });

      const userData: InputItemState = {
        id: result.data.id,
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        isEdit: false,
      };
      setUser([userData, ...user]);
    }
    formRef.current?.reset();
  };

  const del = async (id: number, index: number) => {
    contactApi.remove(id);

    setUser(
      produce((state) => {
        state.splice(index, 1);
      })
    );
  };

  const edit = (id: number, isEdit: boolean) => {
    setUser(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          item.isEdit = isEdit;
        }
      })
    );
  };

  const save = async (id: number, index: number) => {
    const tr = tbodyRef.current?.querySelectorAll("tr")[index];
    const inputList = tr?.querySelectorAll("input");
    const inputArr = Array.prototype.slice.call(inputList);
    const name = inputArr[0].value;
    const phone = inputArr[1].value;
    const email = inputArr[2].value;

    const result = await contactApi.modify(id, { name, phone, email });

    setUser(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          item.name = result.data.name;
          item.phone = result.data.phone;
          item.email = result.data.email;
          item.isEdit = false;
        }
      })
    );
  };

  return (
    <>
      <h2>Contect</h2>
      <form ref={formRef} className="d-flex">
        <input
          ref={inputNameRef}
          type="text"
          className="form-control me-2 form-input"
          placeholder="이름"
        />
        <input
          ref={inputNumRef}
          type="text"
          className="form-control me-2 form-input"
          placeholder="전화번호"
        />
        <input
          ref={inputMailRef}
          type="text"
          className="form-control me-2 form-input"
          placeholder="이메일"
        />
        <button
          id="add-button"
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={() => {
            add();
          }}
        >
          추가
        </button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>

        <tbody ref={tbodyRef}>
          {user.map((item, index) => (
            <tr>
              <td>{item.id}</td>

              {!item.isEdit && <td>{item.name}</td>}
              {item.isEdit && (
                <td>
                  <input
                    type="text"
                    className="w-100"
                    defaultValue={item.name}
                    onKeyPress={(e) => {
                      if (e.code !== "Enter") {
                        return;
                      }
                      save(item.id, index);
                    }}
                  />
                </td>
              )}

              {!item.isEdit && <td>{item.phone}</td>}
              {item.isEdit && (
                <td>
                  <input
                    type="text"
                    className="w-100"
                    defaultValue={item.phone}
                    onKeyPress={(e) => {
                      if (e.code !== "Enter") {
                        return;
                      }
                      save(item.id, index);
                    }}
                  />
                </td>
              )}

              {!item.isEdit && <td>{item.email}</td>}
              {item.isEdit && (
                <td>
                  <input
                    type="text"
                    className="w-100"
                    defaultValue={item.email}
                    onKeyPress={(e) => {
                      if (e.code !== "Enter") {
                        return;
                      }
                      save(item.id, index);
                    }}
                  />
                </td>
              )}

              {!item.isEdit && (
                <td>
                  <button
                    className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                    onClick={() => {
                      edit(item.id, true);
                    }}
                  >
                    수정
                  </button>
                </td>
              )}
              {item.isEdit && (
                <td>
                  <button
                    className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                    onClick={() => {
                      save(item.id, index);
                    }}
                  >
                    저장
                  </button>
                </td>
              )}

              <td>
                <button
                  className="btn btn-outline-secondary btn-sm  text-nowrap"
                  onClick={() => {
                    del(item.id, index);
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Contect;