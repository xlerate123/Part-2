const Header = ({courseName}) => <h2>{courseName}</h2>

const Part = ({ parts }) => 
  <p>
    {parts.name} {parts.exercises}
  </p>

const Content = ({ parts }) => {
  return(
  <div>
    {parts.map(parts => (<Part key={parts.id}
      parts={parts} />
    ))}
  </div>
  )
}


const Course = ({ course }) => {
  const total = 
  course.parts.reduce((sum, part) => sum+part.exercises, 0)
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <p><b>total of {total} exercises</b></p>
    </div>
  );
};

export default Course