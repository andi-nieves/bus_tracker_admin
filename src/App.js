import { Formik, Field, Form } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { NEW_BUS, BUS_LIST_QUERY, DELETE_BUS, UPDATE_BUS } from "./graphql/bus";
import "./App.css";
import { useEffect, useState } from "react";
import { BusInfo, Driver, Conductor } from "./components/bus";
import { orderBy } from 'lodash'

/*
    bus_id:"3",
    passenger_count:5,
    bus_name:"Victory Liner",
    departure:"iba",
    arrival:"Sta Cruz"

*/

const fields = {
  bus_id: "",
  bus_name: "",
  departure: "",
  arrival: "",
  bus_image: "",
  driver_image: "",
  driver_contact: "",
  driver_name: "",
  conductor_image: "",
  conductor_name: "",
  conductor_contact: "",
}

function App() {
  const [tab, setTab] = useState(0);
  const [showForm, setShowForm] = useState();
  const [showDelete, setDelete] = useState();
  const [list, setList] = useState([]);
  const { data, loading } = useQuery(BUS_LIST_QUERY);
  const [createBus, { data: newBus, loading: newLoading, error }] =
    useMutation(NEW_BUS, { onCompleted: () => setShowForm(null)});
  const [updateSelected] = useMutation(UPDATE_BUS, { onCompleted: () => setShowForm(null)});
  const [deleteBus, { loading: deleteLoading }] = useMutation(DELETE_BUS);

  useEffect(() => {
    if (data?.allBus) setList(orderBy(data.allBus, 'id', 'desc'));
  }, [data]);

  useEffect(() => {
    if (newBus?.createBus) {
       setList(orderBy([...list, newBus.createBus], 'id', 'desc'));
       setShowForm(null)
    }
  }, [newBus]);

  return (
    <div className="App container">
      <h1>Bus list</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error?.message}
        </div>
      )}
      {showForm && (
        <Formik
          initialValues={showForm}
          onSubmit={async (values, { resetForm }) => {
            if (showForm.id) {
              updateSelected({ variables: values })
            } else {
              createBus({ variables: values });
            }
          }}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="text-left mb-4" style={{ textAlign: "left" }}>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${tab === 0 ? "active" : ""}`}
                      type="button"
                      onClick={() => setTab(0)}
                    >
                      Bus Info
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${tab === 1 ? "active" : ""}`}
                      type="button"
                      onClick={() => setTab(1)}
                    >
                      Driver's Info
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${tab === 2 ? "active" : ""}`}
                      type="button"
                      onClick={() => setTab(2)}
                    >
                      Conductor's Info
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  {tab === 0 && <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <BusInfo setFieldValue={setFieldValue} />
                  </div>}
                  {tab === 1 && <div
                    className="tab-pane fade show active"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <Driver setFieldValue={setFieldValue} />
                  </div>}
                  {tab === 2 && <div
                    className="tab-pane fade show active"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    <Conductor setFieldValue={setFieldValue} />
                  </div>}
                </div>
                
                
                <button className="btn btn-danger" type="submit">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      )}
      <button
        onClick={() => setShowForm(showForm ? null : fields)}
        className="btn btn-info"
        type="submit"
      >
        {showForm ? "Close Form" : "Create new"}
      </button>
      {!showForm && <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>Bus ID</th>
            <th>Bus Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            orderBy(list,'id', 'desc').map((item) => (
              <tr>
                <td>{item.bus_id}</td>
                <td>{item.bus_name}</td>
                <td>{item.arrival}</td>
                <td>{item.departure}</td>
                <td>
                  <a
                    href="#"
                    className="m-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowForm(item);
                    }}
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setDelete(item);
                    }}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>}

      {(loading || newLoading) && (
        <div className="loader">
          <i className="fa fa-spinner" />
        </div>
      )}

      <div
        className="modal"
        style={{ display: showDelete ? "block" : "none" }}
        tabindex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setDelete(undefined)}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete {showDelete?.bus_id} -{" "}
                {showDelete?.bus_name}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDelete(undefined)}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteBus({ variables: { bus_id: showDelete?.bus_id } });
                  setList(
                    list.filter((item) => item.bus_id != showDelete.bus_id)
                  );
                  setDelete(undefined);
                }}
                className="btn btn-primary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
