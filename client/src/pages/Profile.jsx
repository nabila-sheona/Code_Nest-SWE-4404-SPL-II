import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [bio, setBio] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");



  // Include these inputs in your form
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (initializing && currentUser) {
      setBio(currentUser.bio || ""); // Set bio from user data
      setInitializing(false);
    }
  }, [initializing, currentUser]);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name; //gives the image a name with date.now
    const storageRef = ref(storage, fileName); //stores the file in firebase
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleBioChange = (e) => {
    const bioText = e.target.value;
    // Limiting bio to 100 words
    const words = bioText.trim().split(/\s+/);
    if (words.length <= 100) {
      setBio(bioText);
    }
  };
  const handleChangePassword = (e) => {
    if (e.target.id === 'newPassword') {
      setNewPassword(e.target.value);
    } else if (e.target.id === 'currentPassword') {
      setCurrentPassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          bio,
          currentPassword,
          newPassword: newPassword ? newPassword : undefined
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };


  const handleDeleteAccount = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    // If confirmed, proceed with deletion
    if (confirmed) {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error));
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-sky-300 to-white-500">
      <div className="p-3 max-w-lg mx-auto min-h-screen from-blue-500 to-white-500">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} //only one file
          />

          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
          <textarea
            value={bio}
            onChange={handleBioChange}
            placeholder="Bio (100 words limit)"
            className="bg-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            onChange={handleChange}
          />
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleChangePassword}
            placeholder="New password"
            className="bg-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={handleChangePassword}
            placeholder="Current password"
            className="bg-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />


          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opcaity-50 disabled:opacity-80">
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteAccount}
            className="text-red-700 cursor-pointer font-semibold"
          >
            Delete Account
          </span>
          <span
            onClick={handleSignOut}
            className="text-red-700 cursor-pointer font-semibold"
          >
            Sign Out
          </span>
        </div>
        <p className="text-red-700 mt-5">{error && "something went wrong!"}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess && "User is updated successfully"}
        </p>
        
      </div>
    </div>
  );
}
