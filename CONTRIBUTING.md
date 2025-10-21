# Contributing to Incubazar

Thank you for your interest in contributing to Incubazar! This document provides guidelines and best practices for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please be respectful and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/incubazar.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit with clear messages: `git commit -m "Add: Feature description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Development Workflow

### 1. Setting Up Your Environment

```bash
# Install dependencies
npm install
cd ai-service && pip install -r requirements.txt

# Copy environment file
cp env.example .env.local

# Set up Supabase
supabase link --project-ref YOUR_PROJECT
supabase db push
```

### 2. Running Tests

```bash
# Frontend tests
npm run test

# Type checking
npm run type-check

# Linting
npm run lint
```

### 3. Code Style

We use:
- **ESLint** for JavaScript/TypeScript
- **Prettier** for code formatting
- **TypeScript** for type safety

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

## Project Structure

```
incubazar/
├── app/              # Next.js pages and API routes
├── components/       # React components
├── lib/             # Utility functions and integrations
├── supabase/        # Database migrations
└── ai-service/      # Python AI service
```

## Contribution Areas

### 🐛 Bug Fixes

1. Check if the bug is already reported in Issues
2. Create a new issue if not exists
3. Reference the issue in your PR

### ✨ New Features

1. Open an issue to discuss the feature
2. Wait for maintainer approval
3. Implement the feature
4. Add tests and documentation
5. Submit PR

### 📝 Documentation

- Fix typos
- Improve clarity
- Add examples
- Update outdated information

### 🎨 UI/UX Improvements

- Follow existing design system
- Ensure accessibility (WCAG 2.1 AA)
- Test on multiple devices
- Add screenshots to PR

## Commit Message Guidelines

We follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add social login support
fix(deals): resolve 200-investor limit bug
docs(api): update payment endpoint documentation
style(ui): improve button hover states
```

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] No console errors or warnings
- [ ] Documentation updated if needed
- [ ] Commit messages follow guidelines
- [ ] Branch is up to date with main

### PR Title

Use conventional commit format:
```
feat(component): add new feature
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] No regressions found

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Fixes #123
```

## Areas We Need Help With

### High Priority
- [ ] Comprehensive test coverage
- [ ] Mobile responsive improvements
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Error handling enhancements

### Feature Requests
- [ ] Advanced analytics dashboard
- [ ] Email notification system
- [ ] Real-time chat between founders and investors
- [ ] Multi-language support
- [ ] Export functionality (deals, portfolio)
- [ ] Advanced search with filters
- [ ] Investment history graphs
- [ ] Mentor matching system

### Documentation
- [ ] Video tutorials
- [ ] API usage examples
- [ ] Deployment guides for different platforms
- [ ] Architecture diagrams
- [ ] Best practices guide

## Coding Standards

### TypeScript

```typescript
// Good: Explicit types
interface User {
  id: string
  email: string
  role: 'founder' | 'investor' | 'admin'
}

const getUser = (id: string): Promise<User> => {
  // ...
}

// Bad: Any types
const getUser = (id: any): any => {
  // ...
}
```

### React Components

```typescript
// Good: Functional components with TypeScript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return <button onClick={onClick} className={variant}>{label}</button>
}

// Bad: No types
export const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>
}
```

### Error Handling

```typescript
// Good: Proper error handling
try {
  const data = await fetchData()
  return { data, error: null }
} catch (error) {
  console.error('Failed to fetch:', error)
  return { data: null, error: 'Failed to fetch data' }
}

// Bad: Silent failures
try {
  const data = await fetchData()
  return data
} catch (error) {
  // No error handling
}
```

## Database Changes

If your contribution involves database changes:

1. Create a new migration file:
```bash
supabase migration new your_migration_name
```

2. Write SQL in the migration file
3. Test locally:
```bash
supabase db reset
```

4. Document the changes in PR

## API Changes

If adding/modifying API endpoints:

1. Follow REST conventions
2. Add TypeScript types
3. Implement error handling
4. Add rate limiting considerations
5. Update API.md documentation

## Security

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security@incubazar.com
3. Provide detailed information
4. Wait for response before disclosure

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## Questions?

- Open a discussion on GitHub
- Join our Discord community
- Email: developers@incubazar.com

---

**Thank you for contributing to Incubazar! 🙏**
