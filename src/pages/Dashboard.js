import axios from 'axios';
import React, { useEffect, useRef, useState, useContext, useMemo } from 'react'
import { BASE_URL } from '../BaseUrl';
import { AuthContext } from '../authFolder/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdPendingActions, MdAssignment } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";

export default function Dashboard() {
  const userId = JSON.parse(localStorage.getItem('userDetail'));
  const auth = useContext(AuthContext);
  const history = useNavigate();
  const [trainigData, setTrainingData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [endingDate, setEndingDate] = useState('')
  const [curKey, setCurKey] = useState(0);
  const [state, setState] = useState('');


  const updateTraining = (e) => {
    axios.put(`${BASE_URL}/trainingUpdate/${curKey}`, { 'state': e.target.value })
      .then((res) => {
        console.log(res);

        axios.get(`${BASE_URL}/training/${userId ? userId.id : null}`)
          .then((response) => {
            setTrainingData(response.data);
            localStorage.setItem("pending", response.data.filter(obj => obj.state === 'pending').length);
            localStorage.setItem("completed", response.data.filter(obj => obj.state === 'completed').length);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e.response.statusText);
          });
      })
      .catch((e) => console.log(e.statusText));
  }

  //########################### Fetching Pending Trainings Data from LocalStorage #########################################

  const curDate = useRef();

  const filterData = useMemo(() => {
    return trainigData.filter(training => (
      ((!selectedDate || training.TrainingDate >= selectedDate) &&
      (!endingDate || training.TrainingDate <= endingDate) &&
      (!state || training.state === state)) || training.state === 'pending'
    ));
  }, [selectedDate, endingDate, state, trainigData]);


  const resetFilter = () => {
    setSelectedDate(new Date().toISOString().slice(0,10)); setEndingDate(''); setState('');
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/training/${userId ? userId.id : null}`)
      .then((response) => {
        setTrainingData(response.data);
        localStorage.setItem("pending", response.data.filter(obj => obj.state === 'pending').length);
        localStorage.setItem("completed", response.data.filter(obj => obj.state === 'completed').length);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e.response.statusText);
      });

  },[])

  return (
    <>
      {auth.is_Authenticated ?

        <div className='d-flext jutify-content-center container mt-2'>

          {/* Details Container */}

          <div className="container text-center">
            <div className="row">
              <div className="col-4 mb-2">
                <div className="card">
                  <div className="card-header text-bg-danger">
                    Total Training
                  </div>
                  <div className="card-body">
                    <h1 className='card-title'>{trainigData.length}</h1>
                    <MdAssignment size={30} />
                  </div>
                </div>
              </div>

              <div className="col-4 mb-2">
                <div className="card">
                  <div className="card-header text-bg-warning">
                    On Going
                  </div>
                  <div className="card-body">
                    <h1 className='card-title'>{localStorage.getItem('pending')}</h1>
                    <MdPendingActions size={30} />
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="card">
                  <div className="card-header text-bg-success">
                    Completed
                  </div>
                  <div className="card-body">
                    <h1 className='card-title'>{localStorage.getItem('completed')}</h1>
                    <AiOutlineFileDone size={30} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ######################  Filter section  ####################### */}

          <div className="container d-flex justify-content-start">
            <div className="mb-2 d-flex align-items-center">
              <input type="date" value={selectedDate} ref={curDate} onChange={(e) => setSelectedDate(e.target.value)} className='form-control' name="TrainingDate" />
            </div>

            <div className="mb-2 mx-2 d-flex align-items-center">
              <input type="date" value={endingDate} onChange={(e) => setEndingDate(e.target.value)} className='form-control' name="endingDate" />
            </div>

            <div className="mx-2 mb-2 d-flex align-items-center">
              <select className="form-select" aria-label="Default select example" value={state} name='state' onChange={(e) => setState(e.target.value)}>
                <option value='none' hidden>Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mx-2 mb-2 d-flex align-items-center">
              <input type="button" value="Reset Filter" onClick={resetFilter} className='form-control' />
            </div>
          </div>

          {/* Cards Section */}

          < div className='container d-flex justify-content-start align-items-center flex-wrap'>

            {
              filterData.length !== 0 ?
                filterData.map((tData) => {
                  return (
                    <div className={`card mx-3 mb-3 ${tData.state === 'completed' ? "bg-success" : "bg-warning"}`} key={tData.id} style={{ width: "18rem" }}>
                      <div className="card-body">
                        <h5 className="card-title mb-3">{tData.schoolName}</h5>
                        <h6 className="card-subtitle fw-bold mb-2">{tData.trainerName}</h6>
                        <p className='card-subtitle'>a</p>
                      </div>
                      <div className='card-body text-bg-dark'>
                        <div className='row d-flex align-items-center'>
                          <div className='card-body col-6'>
                            <h6 className='card-subtitle mb-2'>{tData.TrainingDate}</h6>
                            <p className="card-subtitle mb-2 mt-2">Starting : {tData.startTime}</p>
                            <p className="card-subtitle mb-2">Ending : {tData.endTime}</p>
                          </div>
                          <div className="col-6">
                            <select className="form-select text-bg-dark" onClick={() => setCurKey(tData.id)} onChange={(e) => updateTraining(e)} aria-label="Default select example" name='state'>
                              <option value='none' hidden>Status</option>
                              <option value="pending">On Going</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }) :
                <div className="container">
                  <h1>You don't have any training today</h1>
                </div>
            }

          </div >
        </div > : history("/")
      }
    </>
  )
}
