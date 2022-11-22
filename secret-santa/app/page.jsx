import styles from './page.module.css'
import UserForm from './firebase/UserForm'

export default function Home() {
  return (

    <div style={{
      backgroundImage: "url(/santa.jpg)",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}
         className={styles.container} >
      <main className={styles.main}>
          <UserForm />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
