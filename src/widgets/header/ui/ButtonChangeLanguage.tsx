import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export const ButtonChangeLanguage: FC = () => {
	const { i18n } = useTranslation();
	const onClick = (): void => {
		if (i18n.language === 'ru') {
			i18n.changeLanguage('en');
		}

		i18n.changeLanguage('ru');
	};

	return (
		<button onClick={onClick}>
			<span className={classNames({ 'font-bold': i18n.language === 'ru' })}>
				RU&nbsp;
			</span>
			<span className="font-bold">|</span>
			<span className={classNames({ 'font-bold': i18n.language === 'en' })}>
				&nbsp;EN
			</span>
		</button>
	);
};
