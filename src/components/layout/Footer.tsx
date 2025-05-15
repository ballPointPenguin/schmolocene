const Footer = () => {
  return (
    <footer className="bg-slate-900 py-4 px-4 text-center text-sm text-slate-400">
      <p>&copy; {new Date().getFullYear()} Holocene Schmolocene - Learn the Geologic Time Scale</p>
      <p className="mt-1">
        <a 
          href="https://github.com/ballPointPenguin/schmolocene" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-300 hover:text-primary-200 transition-colors"
        >
          View source on GitHub
        </a>
      </p>
    </footer>
  )
}

export default Footer
