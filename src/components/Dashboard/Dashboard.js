'use client'
import { useEffect, useState } from 'react';
import { AiOutlineMenu, AiFillDelete } from 'react-icons/ai';
import Link from 'next/link';
import styles from './dashboard.module.css';
import { Data } from '@react-google-maps/api';
// import AllBlogs from '../components/AllBlogs';
// import Create from '../components/Create';
// import AddRoute from '../components/AddRoute';
// import CreateCity from '../components/CreateCity';
// import Footer from '../components/Footer';
// import { useRouter } from 'next/router';

const AdminDashboard = ({ loginStatus, userRole, setLoginStatus }) => {
  const [activeTab, setActiveTab] = useState('');
  const [data, setData] = useState([]);
  const [sliderVisible, setSliderVisible] = useState(true);
  const [sidebarClosed, setSidebarClosed] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    async function fetchData() {
        try {
            console.log("Fetching data...");
            const res = await fetch("http://localhost:3000/api/formdata", {
                cache: "no-store",
            });
            if (!res.ok) {
                console.error("Failed to fetch data. Rsponse status:", res.status);
                // Log the response status to see if it provides more information
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setData(data);
        } catch (error) {
            console.error("Error fetching form data:", error);
        }
    }

    fetchData();
}, []);
const handleDeleteField = (id) => {
  // Make a DELETE request to the server to delete the field
  fetch(`https://backend-taxi.onrender.com/formdata/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message); // Log the response message
      fetchFormData(); // Fetch the updated data after successful deletion
    })
    .catch((error) => {
      console.error('Error deleting field:', error);
    });
};
// Step 1: Create state variables for today's and previous leads
const [todaysLeads, setTodaysLeads] = useState({ local: [], carpack: [], round: [], oneway: [] });
const [previousLeads, setPreviousLeads] = useState({ local: [], carpack: [], round: [], oneway: [] });

// Step 2: Filter the leads based on the current date
useEffect(() => {
  if (data) {
    const today = new Date().toLocaleDateString();
    const formattedToday = formatDate(today);

    // Check if data.local is defined before filtering
    const filteredLocalLeadsToday = data.local
      ? data.local.filter((lead) => lead.currentdate === formattedToday)
      : [];

    // Check if data.carpack is defined before filtering
    const filteredCarpackLeadsToday = data.carpack
      ? data.carpack.filter((lead) => lead.currentdate === formattedToday)
      : [];

    // Check if data.round is defined before filtering
    const filteredRoundLeadsToday = data.round
      ? data.round.filter((lead) => lead.currentdate === formattedToday)
      : [];

    // Check if data.oneway is defined before filtering
    const filteredOnewayLeadsToday = data.oneway
      ? data.oneway.filter((lead) => lead.currentdate === formattedToday)
      : [];

    setTodaysLeads({
      local: filteredLocalLeadsToday,
      carpack: filteredCarpackLeadsToday,
      round: filteredRoundLeadsToday,
      oneway: filteredOnewayLeadsToday,
    });

    // Step 3: Filter the leads based on the previous date (not equal to today)
    const filteredLocalLeadsPrevious = data.local
      ? data.local.filter((lead) => lead.currentdate !== formattedToday)
      : [];

    const filteredCarpackLeadsPrevious = data.carpack
      ? data.carpack.filter((lead) => lead.currentdate !== formattedToday)
      : [];

    const filteredRoundLeadsPrevious = data.round
      ? data.round.filter((lead) => lead.currentdate !== formattedToday)
      : [];

    const filteredOnewayLeadsPrevious = data.oneway
      ? data.oneway.filter((lead) => lead.currentdate !== formattedToday)
      : [];

    setPreviousLeads({
      local: filteredLocalLeadsPrevious,
      carpack: filteredCarpackLeadsPrevious,
      round: filteredRoundLeadsPrevious,
      oneway: filteredOnewayLeadsPrevious,
    });
  }
}, [data]);



const toggleSlider = () => {
  setSliderVisible(!sliderVisible);
};

const handleModeToggle = () => {
  // Toggle the dark mode state
  setDarkMode((prevMode) => !prevMode);
};

const handleSidebarToggle = () => {
  setSidebarClosed(prevStatus => !prevStatus);
};
const formatDate = (dateString) => {
  const parts = dateString.split("/");
  const formattedDate = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
  return formattedDate;
};

const handleLogout = () => {
  setLoginStatus(false);
  navigate('/Login'); // Redirect to '/Login' route
};
return (
  <>
    { (
      <div >
        <nav className={`${styles.nav} ${sidebarClosed ? styles.close : ''}`}>
          <div className={styles.logoName}>
            <div className={styles.logoImage}>
            </div>
            <span className={styles.logoName}>Dashboard</span>
          </div>
          <div className={styles.menuItems}>
            <ul className={styles.navLinks}>
              {(userRole === 'admin' || userRole === 'lead') && (
                <>
                  <li>
                    <Link href="#">
                   
                        <i className="uil uil-files-landscapes"></i>
                        <span className={styles.linkName} onClick={() => handleTabClick('round')}>
                          Round Trip
                        </span>
                    
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                    
                        <i className="uil uil-chart"></i>
                        <span className={styles.linkName} onClick={() => handleTabClick('oneway')}>
                          Oneway Trip
                        </span>
               
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                
                        <i className="uil uil-thumbs-up"></i>
                        <span className={styles.linkName} onClick={() => handleTabClick('local')}>
                          Local
                        </span>
                   
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                   
                        <i className="uil uil-comments"></i>
                        <span className={styles.linkName} onClick={() => handleTabClick('carpack')}>
                          Car Package
                        </span>
                
                    </Link>
                  </li>
                </>
              )}
              {(userRole === 'admin' || userRole === 'editor') && (
                <>
                  <li>
                    <Link href="#">
                 
                        <i className="uil uil-comments"></i>
                        <span className={styles.linkName} onClick={() => handleTabClick('AllBlogs')}>
                          All Blogs
                        </span>
                
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                     
                        <i className="uil uil-comments"></i>
                        <span className={styles.linkName} onClick={() => handleTabClick('CreateBlog')}>
                          Add Blogs
                        </span>
                     
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                     
                        <i className="uil uil-comments"></i>
                        <span className={styles.linkName} onClick={() => handleTabClick('CreateRoute')}>
                          Add Routes
                        </span>
                      
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                     
                        <i className="uil uil-comments"></i>
                        <span className={styles.linkName} onClick={() => handleTabClick('CreateCity')}>
                          Add Cities
                        </span>
                      
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                   
                        <i className="uil uil-comments"></i>
                        <span className={styles.linkName} onClick={() => handleTabClick('EditCR')}>
                          Edit Cities/Routes
                        </span>
                    
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <ul className={styles.logoutMode}>
              <li>
                <Link href="#">
                 
                    <i className="uil uil-signout"></i>
                    <span className={styles.linkName} onClick={handleLogout}>
                      Logout
                    </span>
                 
                </Link>
              </li>
              <li className={styles.mode}>
                <Link href="#">
                 
                    <i className="uil uil-moon"></i>
                    <span className={styles.linkName}>Dark Mode</span>
                 
                </Link>
                <div className={styles.modeToggle} onClick={handleModeToggle}>
                  <span className={styles.switch}></span>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <section className="dashboardContent">
      <div className={`top ${sidebarClosed ? 'closed' : ''}`}>
  <AiOutlineMenu className="sidebar-toggle" onClick={handleSidebarToggle} />
 
</div>
        <div class="dash-content">
           
            <div class="activity">
            <div class="box-wrap">
        <div class="table-wrap">
       { (activeTab === 'round' || activeTab==='oneway' || activeTab==='local' || activeTab==='carpack') && <h2>Today's Leads</h2> }
        <table className={`data-table ${activeTab !== 'local' ? 'hidden' : ''}`}>
          <thead>
            <tr>
              <th>SrNo.</th>
              <th>date</th>
              <th>phone</th>
              <th>city</th>
              <th>tourPackage</th>
              <th>carType</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i, index) => (
              <tr key={index}>
                <td>{index+1}<AiFillDelete className='delete-opt' onClick={() => handleDeleteField(i._id)}/></td>
                <td>{i.date}</td>
                <td>{i.phone}</td>
                <td>{i.city}</td>
                <td>{i.tourPackage}</td>
                <td>{i.carType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className={`data-table ${activeTab !== 'carpack' ? 'hidden' : ''}`}>
          <thead>
            <tr>
            <th>SrNo.</th>
              <th>date</th>
              <th>phone</th>
              <th>city</th>
              <th>returnDate</th>
              <th>days</th>
              <th>carType</th>
            </tr>
          </thead>
          <tbody>
            {todaysLeads.carpack.map((i, index) => (
              <tr key={index}>
                <td>{index+1}<AiFillDelete className='delete-opt' onClick={() => handleDeleteField(i._id)}/></td>
                <td>{i.date}</td>
                <td>{i.phone}</td>
                <td>{i.city}</td>
                <td>{i.returnDate}</td>
                <td>{i.days}</td>
                <td>{i.carType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className={`data-table ${activeTab !== 'round' ? 'hidden' : ''}`}>
          <thead>
            <tr>
            <th>SrNo.</th>
              <th>fromLocation</th>
              <th>toLocation</th>
              <th>date</th>
              <th>time</th>
              <th>phone</th>
              <th>returnDate</th>
              <th>carType</th>
            </tr>
          </thead>
          <tbody>
            {todaysLeads.round.map((i, index) => (
              <tr key={index}>
                 <td>{index+1}<AiFillDelete className='delete-opt' onClick={() => handleDeleteField(i._id)}/></td>
                <td>{i.fromLocation}</td>
                <td>{i.toLocation}</td>
                <td>{i.date}</td>
                <td>{i.time}</td>
                <td>{i.phone}</td>
                <td>{i.returnDate}</td>
                <td>{i.carType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className={`data-table ${activeTab !== 'oneway' ? 'hidden' : ''}`}>
          <thead>
            <tr>
            <th>SrNo.</th>
              <th>fromLocation</th>
              <th>toLocation</th>
              <th>date</th>
              <th>time</th>
              <th>phone</th>
              <th>carType</th>
            </tr>
          </thead>
          <tbody>
            {todaysLeads.oneway.map((i, index) => (
              <tr key={index}>
                 <td>{index+1}<AiFillDelete className='delete-opt' onClick={() => handleDeleteField(i._id)}/></td>
                <td>{i.fromLocation}</td>
                <td>{i.toLocation}</td>
                <td>{i.date}</td>
                <td>{i.time}</td>
                <td>{i.phone}</td>
                <td>{i.carType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        { (activeTab === 'round' || activeTab==='oneway' || activeTab==='local' || activeTab==='carpack')  && <h2>Previous Day's Leads</h2>}
        <table className={`data-table ${activeTab !== 'local' ? 'hidden' : ''}`}>
          <thead>
            <tr>
              <th>SrNo.</th>
              <th>date</th>
              <th>phone</th>
              <th>city</th>
              <th>tourPackage</th>
              <th>carType</th>
            </tr>
          </thead>
          <tbody>
            {previousLeads.local.map((i, index) => (
              <tr key={index}>
                <td>{index+1}<AiFillDelete className='delete-opt' onClick={() => handleDeleteField(i._id)}/></td>
                <td>{i.date}</td>
                <td>{i.phone}</td>
                <td>{i.city}</td>
                <td>{i.tourPackage}</td>
                <td>{i.carType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className={`data-table ${activeTab !== 'carpack' ? 'hidden' : ''}`}>
          <thead>
            <tr>
            <th>SrNo.</th>
              <th>date</th>
              <th>phone</th>
              <th>city</th>
              <th>returnDate</th>
              <th>days</th>
              <th>carType</th>
            </tr>
          </thead>
          <tbody>
            {previousLeads.carpack.map((i, index) => (
              <tr key={index}>
                <td>{index+1}<AiFillDelete className='delete-opt' onClick={() => handleDeleteField(i._id)}/></td>
                <td>{i.date}</td>
                <td>{i.phone}</td>
                <td>{i.city}</td>
                <td>{i.returnDate}</td>
                <td>{i.days}</td>
                <td>{i.carType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className={`data-table ${activeTab !== 'round' ? 'hidden' : ''}`}>
          <thead>
            <tr>
            <th>SrNo.</th>
              <th>fromLocation</th>
              <th>toLocation</th>
              <th>date</th>
              <th>time</th>
              <th>phone</th>
              <th>returnDate</th>
              <th>carType</th>
            </tr>
          </thead>
          <tbody>
            {previousLeads.round.map((i, index) => (
              <tr key={index}>
                 <td>{index+1}<AiFillDelete className='delete-opt' onClick={() => handleDeleteField(i._id)}/></td>
                <td>{i.fromLocation}</td>
                <td>{i.toLocation}</td>
                <td>{i.date}</td>
                <td>{i.time}</td>
                <td>{i.phone}</td>
                <td>{i.returnDate}</td>
                <td>{i.carType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className={`data-table ${activeTab !== 'oneway' ? 'hidden' : ''}`}>
          <thead>
            <tr>
            <th>SrNo.</th>
              <th>fromLocation</th>
              <th>toLocation</th>
              <th>date</th>
              <th>time</th>
              <th>phone</th>
              <th>carType</th>
            </tr>
          </thead>
          <tbody>
            {previousLeads.oneway.map((i, index) => (
              <tr key={index}>
                 <td>{index+1}<AiFillDelete className='delete-opt' onClick={() => handleDeleteField(i._id)}/></td>
                <td>{i.fromLocation}</td>
                <td>{i.toLocation}</td>
                <td>{i.date}</td>
                <td>{i.time}</td>
                <td>{i.phone}</td>
                <td>{i.carType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {activeTab === 'AllBlogs' && <AllBlogs loginStatus={loginStatus} />} 
              {activeTab === 'CreateBlog' && <Create />}
              {activeTab === 'CreateRoute' && <AddRoute />}
              {activeTab === 'CreateCity' && <CreateCity />}
              {activeTab === 'EditCR' && <Footer loginStatus={loginStatus} />}
              {activeTab === '' && (<h2>
              Welcome to the Admin Dashboard. Click on the tabs to know more!
              </h2>)}


    </div> 
                
            </div>
        </div>
      </section>
        </div>
      )}
    </>
  );
};
export default AdminDashboard;
