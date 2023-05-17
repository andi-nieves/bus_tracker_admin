import { Field } from "formik";

const readImage = (event, onSuccess = () => {}) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    if (fileReader.readyState === 2) {
      onSuccess(fileReader.result);
    }
  };
  fileReader.readAsDataURL(event.target.files[0]);
};

export const BusInfo = ({ setFieldValue }) => {
  return (
    <>
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
      <div className="mb-2">
        <label className="form-label">Bus Image</label>
        <input
          className="form-control"
          onChange={(event) => readImage(event, (result) => setFieldValue("bus_image", result))}
          type="file"
        />
      </div>
    </>
  );
};

export const Driver = ({setFieldValue}) => <>
    <div className="mb-2">
      <label className="form-label">Driver's Fulname</label>
      <Field className="form-control" name="driver_name" type="text" />
    </div>
    <div className="mb-2">
      <label className="form-label">Driver Contact Number</label>
      <Field className="form-control" name="driver_contact" type="text" />
    </div>
    <div className="mb-2">
        <label className="form-label">Bus Image</label>
        <input
          className="form-control"
          onChange={(event) => readImage(event, (result) => setFieldValue("driver_image", result))}
          type="file"
        />
      </div>
  </>


export const Conductor = ({setFieldValue}) => <>
    <div className="mb-2">
      <label className="form-label">Conductor's Fulname</label>
      <Field className="form-control" name="conductor_name" type="text" />
    </div>
    <div className="mb-2">
      <label className="form-label">Conductor Contact Number</label>
      <Field className="form-control" name="conductor_contact" type="text" />
    </div>
    <div className="mb-2">
        <label className="form-label">Bus Image</label>
        <input
          className="form-control"
          onChange={(event) => readImage(event, (result) => setFieldValue("conductor_image", result))}
          type="file"
        />
      </div>
  </>

