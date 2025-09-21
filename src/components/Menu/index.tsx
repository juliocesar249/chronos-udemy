import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { RouterLink } from '../RouterLink';

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
    }, [theme]);

    return (
        <nav className={styles.menu}>
            <RouterLink className={styles.menuLink} href='/' aria-label='Ir para a página inicial' title='Início'>
                <HouseIcon />
            </RouterLink>
            <RouterLink className={styles.menuLink} href='/history/' aria-label='Ver histórico de tarefas' title='Histórico'>
                <HistoryIcon />
            </RouterLink>
            <RouterLink className={styles.menuLink} href='/settings/' aria-label='Ir para as configurações' title='Configurações'>
                <SettingsIcon />
            </RouterLink>
            <RouterLink onClick={handleThemeChange} className={styles.menuLink} href='#' aria-label='Mudar tema de cores da página' title='Tema'>
                {nextThemeIcon[theme]}
            </RouterLink>
        </nav>
    );
}