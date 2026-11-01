interface Props {
  title: string;
  skills: string[];
  type: 'matched' | 'missing';
}

export default function SkillsCard({
  title,
  skills,
  type,
}: Props) {
  return (
    <div className="skills-card">
      <h3>{title}</h3>

      {skills.length === 0 ? (
        <p>No skills found.</p>
      ) : (
        <div className="skill-list">
          {skills.map((skill) => (
            <span
              key={skill}
              className={`skill-tag ${type}`}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}   