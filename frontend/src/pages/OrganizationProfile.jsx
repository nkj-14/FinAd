import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BasicButtons from "../muiComponents/Button";
import CreatePost from "../components/CreatePost";
import toast from "react-hot-toast";

const OrganizationProfile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("orgId");
  const [orgDetails, setOrgDetails] = useState("");
  const [isCreateJobPost, setIsCreateJobPost] = useState(true);
  const [textContent, setTextContent] = useState("");
  const [imageArray, setImageArray] = useState([]);
  const [loading, isLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handlePost = async (e) => {};

  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64string = reader.result;
      setImageArray((prevArray) => [...prevArray, base64string]);
      toast.success("Image uploaded");
    };
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileToBase64(file);
    e.target.value = null;
  };

  useEffect(() => {
    async function getOrgById() {
      const orgResponse = await axios.get(`/api/organisations/getOrganisationById/${query}`);
      setOrgDetails(orgResponse.data);
    }

    getOrgById();
  }, []);

  return (
    <div className="w-[100%] min-h-screen">
      <div className="text-white w-[100%]">
        <div className="h-[150px] w-[100%]"></div>
        <div className="w-[150px] h-[150px] rounded-full ml-20 flex items-center">
          <img className="w-[150px] h-[150px] rounded-full" src={orgDetails.logo} alt="no-logo" />
          <div className="ml-10">
            <div className="text-4xl">{orgDetails.name}</div>
            <div className="text-xl">{orgDetails.tagline}</div>
          </div>
        </div>
        <div className="text-xl w-[100%] flex ml-20 mt-5">
          <div className="w-[50%]">{orgDetails.bio}</div>
          <div className="w-[50%]">{orgDetails.website}</div>
        </div>
        <div className="text-xl w-[100%] flex ml-20 mt-2">
          <div className="w-[50%]">{orgDetails.location}</div>
          <div className="w-[50%]">{orgDetails.founded}</div>
        </div>
        <div className="text-xl w-[100%] flex ml-20 mt-2">
          <div className="w-[50%]">{orgDetails.followers} Followers</div>
        </div>
        <div className="ml-20 mt-10 flex">
          <div>
            <BasicButtons label="Create Ad Post" width={300} onClick={() => setIsCreateJobPost(!isCreateJobPost)} />
          </div>

          <div className="w-[60%] ml-20">
            {isCreateJobPost && (
              <CreatePost
                onClick={() => setIsCreateJobPost(!isCreateJobPost)}
                textContent={textContent}
                setTextContent={setTextContent}
                handlePost={handlePost}
                handleImage={handleImage}
                imageArray={imageArray}
                setImageArray={setImageArray}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
