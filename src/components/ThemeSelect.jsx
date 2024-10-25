import useTheme from '../hooks/useTheme'

const ThemeSelect = () => {
  const { theme, changeTheme } = useTheme()
  return (
    <select defaultValue={theme} onChange={(e) => changeTheme(e.target.value)}>
      {['light', 'dark', 'os-default'].map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
export default ThemeSelect
