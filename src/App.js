import { Formik, Field, Form } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { NEW_BUS, BUS_LIST_QUERY, DELETE_BUS } from "./graphql/bus";
import "./App.css";
import { useEffect, useState } from "react";
/*
    bus_id:"3",
    passenger_count:5,
    bus_name:"Victory Liner",
    departure:"iba",
    arrival:"Sta Cruz"

*/
function App() {
  const [showForm, setShowForm] = useState()
  const [showDelete, setDelete] = useState();
  const [list, setList] = useState([]);
  const { data, loading } = useQuery(BUS_LIST_QUERY);
  const [createBus, { data: newBus, loading: newLoading, error }] =
    useMutation(NEW_BUS);
  const [deleteBus, { loading: deleteLoading }] = useMutation(DELETE_BUS);

  useEffect(() => {
    if (data?.allBus) setList(data.allBus);
  }, [data]);
  useEffect(() => {
    if (newBus?.createBus) setList([...list, newBus.createBus]);
  }, [newBus]);

  return (
    <div className="App container">
      <h1>Bus list</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error?.message}
        </div>
      )}
      {showForm && <Formik
        initialValues={{ bus_id: "", bus_name: "", departure: "", arrival: "" }}
        onSubmit={async (values, { resetForm }) => {
          createBus({ variables: values });
          resetForm();
        }}
      >
        <Form className="text-left mb-4" style={{ textAlign: "left" }}>
          <div className="mb-2">
            <label className="form-label">Bus ID</label>
            <Field className="form-control" name="bus_id" type="text" />
          </div>
          <div className="mb-2">
            <label className="form-label">Bus Name</label>
            <Field className="form-control" name="bus_name" type="text" />
          </div>
          <div className="mb-2">
            <label className="form-label">Origin</label>
            <Field className="form-control" name="departure" type="text" />
          </div>
          <div className="mb-2">
            <label className="form-label">Destination</label>
            <Field className="form-control" name="arrival" type="text" />
          </div>
          <button className="btn btn-danger" type="submit">
            Submit
          </button>
        </Form>
      </Formik>}
      <button onClick={() => setShowForm(!showForm)} className="btn btn-info" type="submit">{showForm ? 'Close Form' : 'Create new'}</button>
      <table className="table table-dark table-striped table-hover">
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
            list.map((item) => (
              <tr>
                <td>{item.bus_id}</td>
                <td>{item.bus_name}</td>
                <td>{item.arrival}</td>
                <td>{item.departure}</td>
                <td>
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
      </table>
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
              <button type="button" onClick={() => {
                deleteBus({ variables: { bus_id: showDelete?.bus_id }})
                setList(list.filter(item => item.bus_id != showDelete.bus_id))
                setDelete(undefined)
              }} className="btn btn-primary">
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
