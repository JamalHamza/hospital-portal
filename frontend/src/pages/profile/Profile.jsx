import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import Notification from '../../components/notification/Notification';
import useRedirectLoggedOutUser from '../../customHooks/useRedirectLoggedOutUser';
import {
  getUser,
  selectorUser,
  updateUser,
} from '../../redux/features/auth/authSlice';
import './Profile.css';

// ! Cloudinary
const cloud_name = import.meta.env.VITE_REACT_APP_NAME;
const upload_preset = import.meta.env.VITE_REACT_APP_UPDLOAD_PRESET;
// ! ---------
export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat('...');
    return shoretenedText;
  }
  return text;
};

function ProfileAdmin() {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const initialState = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    photo: user?.photo || '',
    role: user?.role || '',
    isVerified: user?.isVerified || false,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  // ! -----------
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  // ! -----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  // ! -----------
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
      if (
        profileImage !== null &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/png')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', cloud_name);
        image.append('upload_preset', upload_preset);

        // ! Save image to Cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dgx69wsh7/image/upload',
          { method: 'post', body: image }
        );
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.url.toString();
      }

      // ! Save profile to MongoDB
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };

      dispatch(updateUser(userData));
    } catch (error) {
      toast.error(error.message);
    }
  };
  // ! -----------
  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        bio: user.bio,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
  }, [user]);
  // ! -----------
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!profile.isVerified && <Notification />}
          <Box
            sx={{
              bgcolor: 'form.main',
              maxWidth: '60rem',
              m: '2em auto',
              borderRadius: '10px',
            }}
          >
            <Typography
              variant='h3'
              sx={{ textAlign: 'center', color: 'primary.main', p: '0.6em' }}
            >
              Profile
            </Typography>
            <Box
              className='profile--form'
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}
            >
              {!isLoading && user && (
                <>
                  <Box>
                    <Box
                      sx={{
                        maxWidth: '90vw',
                      }}
                    >
                      <img
                        src={imagePreview === null ? user?.photo : imagePreview}
                        alt='Profileimg'
                        style={{
                          height: '200px',
                          width: '200px',
                          borderRadius: '50%',
                        }}
                      />
                      <Typography
                        variant='h5'
                        sx={{ textAlign: 'center', color: 'primary.main' }}
                      >
                        Role: {profile?.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <form onSubmit={handleSaveProfile}>
                      <Box
                        sx={{
                          maxWidth: '32rem',
                          width: '32rem',
                          p: '0 1em',
                          textAlign: 'center',
                        }}
                      >
                        <p>
                          <TextField
                            type='file'
                            accept='image/*'
                            name='image'
                            size='small'
                            onChange={handleImageChange}
                            style={{ margin: '4px 0', width: '100%' }}
                          />
                        </p>
                        <p>
                          <TextField
                            type='text'
                            name='name'
                            value={profile?.name}
                            onChange={handleInputChange}
                            style={{ margin: '4px 0', width: '100%' }}
                          />
                        </p>
                        <p>
                          <TextField
                            type='text'
                            name='email'
                            value={profile?.email}
                            onChange={handleInputChange}
                            disabled
                            style={{ margin: '4px 0', width: '100%' }}
                          />
                        </p>
                        <p>
                          <TextField
                            type='text'
                            name='phone'
                            value={profile?.phone}
                            onChange={handleInputChange}
                            style={{ margin: '4px 0', width: '100%' }}
                          />
                        </p>
                        <p>
                          <TextField
                            id='outlined-multiline-static'
                            label='Bio'
                            name='bio'
                            value={profile?.bio}
                            multiline
                            rows={4}
                            onChange={handleInputChange}
                            style={{ margin: '8px 0', width: '100%' }}
                          />
                        </p>
                        <Button
                          type='submit'
                          variant='contained'
                          sx={{
                            bgcolor: 'fourth.main',
                            margin: '0.8em',
                            padding: '0.4em 1em',
                            fontWeight: 800,
                            fontSize: '1.2rem',
                            color: 'primary.dark',
                            '&:hover': {
                              background: '#ccc6b4',
                            },
                          }}
                        >
                          Update Profile
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export const UserName = () => {
  const user = useSelector(selectorUser);

  const username = user?.name || '...';
  return <p className='--color-white'>Hi, {shortenText(username, 9)} |</p>;
};

export default ProfileAdmin;
