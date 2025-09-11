import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
        return storageTheme;
    });

    const nextThemeIcon = {
        dark: <SunIcon/>,
        light: <MoonIcon/>
    }

    function handleThemeChange(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <nav className={styles.menu}>
            <Link className={styles.menuLink} to='/' aria-label='Ir para a página inicial' title='Início'>
                <HouseIcon />
            </Link>
            <a className={styles.menuLink} href='#' aria-label='Ver histórico de tarefas' title='Histórico'>
                <HistoryIcon />
            </a>
            <a className={styles.menuLink} href='#' aria-label='Ir para as configurações' title='Configurações'>
                <SettingsIcon />
            </a>
            <a onClick={handleThemeChange} className={styles.menuLink} href='#' aria-label='Mudar tema de cores da página' title='Tema'>
                {nextThemeIcon[theme]}
            </a>
        </nav>
    );
}