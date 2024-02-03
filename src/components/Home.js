import AddNote from "./AddNote"
import Notes from "./Notes"

const Home = (props) => {
  const { showAlert } = props;
  return (
    <>
      {
        !localStorage.getItem('token') ?
          <div>
            <div align={'center'}>
              <h1><b>Knight</b></h1>
              <h3>A Secured Notebook</h3>
            </div>
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <img src="home.png" style={{width:"400px"}} alt="" />
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                
              </div>
            </div>
          </div>
          :
          <div>
            <AddNote showAlert={showAlert} />
            <br />
            <hr />
            <br />
            <Notes showAlert={showAlert} />
          </div>
      }

    </>
  )
}

export default Home