import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gokul Menon Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1><a href='javascript:home()'>Gokul Menon</a
        ></h1>
        {/* todo get react template here
        also continue following https://medium.com/wesionary-team/deploy-your-next-js-application-on-google-app-engine-in-minutes-cf04c18011ac
        to setup deploy on gae */}
        <div className={styles.grid}>

        <a href="#" className={styles.card}>
          <h3>Welcome </h3>
          <p>Welcome to the little corner of the internet that I can call my home in cyberspace.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;
              My name is Gokul Menon and I work as a Software Engineer
              at Facebook in New York.
              <img src='/static/photos/photo_new.jpg'/>
              I have over 10 years of software development and engineering experience building enterprise
              software like electronic trading systems and algorithmic trading platforms. <br /><br />
              This website is a pet project and I plan to use it as a scratch pad to learn cool web technologies,hack and glue together
              arbitrary pieces of code to make a simple static homepage.
          </p>
          <p>
          I plan to keep this page purely static and keep it simple.<br /><br />
              &nbsp;&nbsp;&nbsp;&nbsp; It is running on google app engine platform with a simple webapp2 framework and
              static html and javascript content. I do plan to migrate to Github Pages , as a first step I have a
              skeleton html 5 page including a blog. You can check it out <br /> here &rarr; <a href="http://github.gokulmenon.com/">
              github.gokulmenon.com</a><br />
              &nbsp;&nbsp;&nbsp;&nbsp;I am passionate about all things Computer Science , Football ,
              astronomy &amp; astrophotography.
              I also love to paint acrylic over canvas panels, play video games and travel and read
              and lastly I am ardent Manchester United Fan.
              They say you can change your city, your country, change your religion but you never change your football club.
          </p>
        </a>

        <a
          href="/home" className={styles.card}
        >
          <p>
          </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
      <p>copyright &copy; 2021 <a href="/home">www.gokulmenon.com</a> <a href="/static/sitemap.xml" > Sitemap </a></p>
      </footer>
    </div>
  )
}
