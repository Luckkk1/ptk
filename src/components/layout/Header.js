import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './Header.module.css';

const Header = () => {
  const router = useRouter();

  let linkContent = router.pathname === '/' ? 'Make Palettes' : 'Back to List';

  let linkPath = router.pathname === '/' ? '/make' : '/';

  const logoClickHandler = () => {
    router.push('/');
  };

  return (
    <hedaer className={classes.head}>
      <h2 className={classes.header__H2} onClick={logoClickHandler}>
        Pick The Color
      </h2>
      <Link href={linkPath}>{linkContent}</Link>
    </hedaer>
  );
};

export default Header;
