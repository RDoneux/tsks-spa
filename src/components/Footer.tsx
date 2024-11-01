import {version} from '../../package.json';

export default function Footer() {
  return (
    <footer className="w-full px-5 md:px-2">
        <ul className="grid grid-cols-3 text-sm">
            <li className="col-start-2 justify-self-center">{process.env.VITE_PROJECT_NAME}</li>
            <li className="justify-self-end">{version}</li>
        </ul>
    </footer>
  )
}
