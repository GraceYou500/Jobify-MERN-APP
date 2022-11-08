import main from '../assets/images/main-alternative.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components'; // don't need to say the path, the index.js is the default one.

const Landing = () => {
  return (
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
            I'm baby intelligentsia tofu tumblr retro locavore. Paleo sartorial
            pug sustainable marfa etsy trust fund. Bodega boys irony knausgaard
            banh mi. Bicycle rights four dollar toast artisan jianbing
            farm-to-table,
          </p>
          <button className='btn btn-hero'>Login/Resister</button>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
