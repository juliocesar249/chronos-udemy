import styles from './syles.module.css';

type GenericHtmlProps = {
  children: React.ReactNode;
}

export function GenericHtml({children}: GenericHtmlProps) {
  return <div className={styles.genericHtml}>{children}</div>
}