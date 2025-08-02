# 🎨 UI Commands

UI-focused commands for visual design implementation and user interface development.

## Available Commands

### /redesign-from-screenshot
Analyze screenshots and implement UI redesigns using the project's design system and Tailwind CSS while preserving all existing functionality.

**Usage**: `/redesign-from-screenshot <screenshot1> [screenshot2] ...`

**Examples**:
- `/redesign-from-screenshot dashboard.png` - Implement a single screen redesign
- `/redesign-from-screenshot login.png register.png` - Update multiple screens
- `/redesign-from-screenshot /path/to/mockup.jpg` - Use design files from any location

**Features**:
- Visual analysis of design elements
- Preservation of existing functionality
- Tailwind CSS implementation
- Design system compliance
- Responsive design support

## When to Use

- **UI Redesigns**: When you have visual mockups or screenshots to implement
- **Design System Updates**: Updating screens to match new design guidelines
- **Component Styling**: Implementing pixel-perfect component designs
- **Responsive Updates**: Ensuring designs work across all screen sizes

## Workflow

1. Provide screenshot(s) of the desired design
2. The UI redesign specialist agent analyzes visual elements
3. Existing functionality is identified and preserved
4. New design is implemented using Tailwind CSS
5. Code is generated that maintains all current features

## Best Practices

- Provide high-quality screenshots for best results
- Include multiple states if available (hover, active, error)
- Specify any design system constraints upfront
- Review generated code for accessibility compliance
- Test functionality after implementation