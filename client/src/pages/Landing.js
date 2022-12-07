import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link, Navigate } from 'react-router-dom';
import { Logo } from '../components'; // don't need to say the path, the index.js is the default one.
import { useAppContext } from '../context/appContext';

const Landing = () => {
  const { user } = useAppContext();
  return (
    <>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          {/* Info */}
          <div className='info'>
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              I'm baby intelligentsia tofu tumblr retro locavore. Paleo
              sartorial pug sustainable marfa etsy trust fund. Bodega boys irony
              knausgaard banh mi. Bicycle rights four dollar toast artisan
              jianbing farm-to-table,
            </p>
            <Link className='btn btn-hero' to='/register'>
              Login/Resister
            </Link>
          </div>
          <img src={main} alt='job hunt' className='img main-img' />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
