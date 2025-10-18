#!/usr/bin/env bash
#
# Skill Validation Script
# Validates Claude Code Skill structure and syntax
#
# Usage: ./validate-skill.sh <skill-path>
# Example: ./validate-skill.sh ~/.claude/skills/my-skill

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
ERRORS=0
WARNINGS=0
CHECKS=0

# Skill path
SKILL_PATH="${1}"

if [ -z "$SKILL_PATH" ]; then
    echo -e "${RED}Error: No skill path provided${NC}"
    echo "Usage: $0 <skill-path>"
    exit 1
fi

if [ ! -d "$SKILL_PATH" ]; then
    echo -e "${RED}Error: Skill directory not found: $SKILL_PATH${NC}"
    exit 1
fi

SKILL_NAME=$(basename "$SKILL_PATH")

echo -e "${BLUE}==============================================================${NC}"
echo -e "${BLUE}Validating Skill: $SKILL_NAME${NC}"
echo -e "${BLUE}Location: $SKILL_PATH${NC}"
echo -e "${BLUE}==============================================================${NC}"
echo

# Check 1: SKILL.md exists
echo -e "${BLUE}[Check 1/10]${NC} Checking SKILL.md existence..."
CHECKS=$((CHECKS + 1))
if [ -f "$SKILL_PATH/SKILL.md" ]; then
    echo -e "${GREEN}✓${NC} SKILL.md found"
    SKILL_FILE="$SKILL_PATH/SKILL.md"
elif [ -f "$SKILL_PATH/skill.md" ]; then
    echo -e "${GREEN}✓${NC} skill.md found"
    SKILL_FILE="$SKILL_PATH/skill.md"
else
    echo -e "${RED}✗ SKILL.md not found${NC}"
    ERRORS=$((ERRORS + 1))
    exit 1
fi
echo

# Check 2: YAML frontmatter structure
echo -e "${BLUE}[Check 2/10]${NC} Validating YAML frontmatter..."
CHECKS=$((CHECKS + 1))

# Check for opening ---
if head -n 1 "$SKILL_FILE" | grep -q "^---$"; then
    echo -e "${GREEN}✓${NC} Opening '---' found on line 1"
else
    echo -e "${RED}✗ Opening '---' not found on line 1${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check for closing ---
if sed -n '2,20p' "$SKILL_FILE" | grep -q "^---$"; then
    echo -e "${GREEN}✓${NC} Closing '---' found"
else
    echo -e "${RED}✗ Closing '---' not found in first 20 lines${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check for tabs in frontmatter (YAML doesn't allow tabs)
if sed -n '/^---$/,/^---$/p' "$SKILL_FILE" | grep -q $'\t'; then
    echo -e "${RED}✗ Tabs found in frontmatter (use spaces)${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓${NC} No tabs in frontmatter"
fi
echo

# Check 3: Required fields
echo -e "${BLUE}[Check 3/10]${NC} Checking required fields..."
CHECKS=$((CHECKS + 1))

# Extract frontmatter
FRONTMATTER=$(sed -n '/^---$/,/^---$/p' "$SKILL_FILE" | sed '1d;$d')

# Check name field
if echo "$FRONTMATTER" | grep -q "^name:"; then
    SKILL_NAME_FIELD=$(echo "$FRONTMATTER" | grep "^name:" | sed 's/name:[[:space:]]*//')
    if [ -n "$SKILL_NAME_FIELD" ]; then
        echo -e "${GREEN}✓${NC} name field present and non-empty: '$SKILL_NAME_FIELD'"
    else
        echo -e "${RED}✗ name field is empty${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}✗ name field missing${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check description field
if echo "$FRONTMATTER" | grep -q "^description:"; then
    DESCRIPTION=$(echo "$FRONTMATTER" | grep "^description:" | sed 's/description:[[:space:]]*//')
    if [ -n "$DESCRIPTION" ]; then
        echo -e "${GREEN}✓${NC} description field present and non-empty"

        # Check description length
        DESC_LENGTH=${#DESCRIPTION}
        if [ $DESC_LENGTH -lt 20 ]; then
            echo -e "${YELLOW}⚠${NC} description is very short ($DESC_LENGTH chars)"
            WARNINGS=$((WARNINGS + 1))
        fi
    else
        echo -e "${RED}✗ description field is empty${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}✗ description field missing${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo

# Check 4: Optional allowed-tools field
echo -e "${BLUE}[Check 4/10]${NC} Checking allowed-tools field..."
CHECKS=$((CHECKS + 1))
if echo "$FRONTMATTER" | grep -q "^allowed-tools:"; then
    ALLOWED_TOOLS=$(echo "$FRONTMATTER" | grep "^allowed-tools:" | sed 's/allowed-tools:[[:space:]]*//')
    echo -e "${GREEN}✓${NC} allowed-tools specified: $ALLOWED_TOOLS"

    # Validate tool names (basic check)
    VALID_TOOLS="Read|Write|Edit|MultiEdit|Bash|Grep|Glob|WebFetch|WebSearch|TodoWrite|Task"
    if echo "$ALLOWED_TOOLS" | grep -qE "$VALID_TOOLS"; then
        echo -e "${GREEN}✓${NC} Tool names appear valid"
    else
        echo -e "${YELLOW}⚠${NC} Some tool names may be invalid"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${GREEN}✓${NC} allowed-tools not specified (unrestricted)"
fi
echo

# Check 5: Content structure
echo -e "${BLUE}[Check 5/10]${NC} Checking content structure..."
CHECKS=$((CHECKS + 1))

# Skip frontmatter for content checks
CONTENT=$(sed '1,/^---$/d' "$SKILL_FILE" | tail -n +2)

# Check for title header
if echo "$CONTENT" | grep -q "^# "; then
    echo -e "${GREEN}✓${NC} Title header found"
else
    echo -e "${YELLOW}⚠${NC} No title header (# Skill Name) found"
    WARNINGS=$((WARNINGS + 1))
fi

# Check for Instructions section
if echo "$CONTENT" | grep -qi "^## Instructions"; then
    echo -e "${GREEN}✓${NC} Instructions section found"
else
    echo -e "${YELLOW}⚠${NC} No Instructions section found"
    WARNINGS=$((WARNINGS + 1))
fi

# Check for Examples section
if echo "$CONTENT" | grep -qi "^## Examples"; then
    echo -e "${GREEN}✓${NC} Examples section found"
else
    echo -e "${YELLOW}⚠${NC} No Examples section found (recommended)"
    WARNINGS=$((WARNINGS + 1))
fi
echo

# Check 6: File references
echo -e "${BLUE}[Check 6/10]${NC} Checking file references..."
CHECKS=$((CHECKS + 1))

# Find all markdown links
LINKS=$(grep -oE '\[.*\]\([^)]+\)' "$SKILL_FILE" | grep -oE '\([^)]+\)' | tr -d '()' | grep -v '^http' | grep -v '^#')

if [ -n "$LINKS" ]; then
    LINK_ERRORS=0
    while IFS= read -r link; do
        if [ -f "$SKILL_PATH/$link" ]; then
            echo -e "${GREEN}✓${NC} Referenced file exists: $link"
        else
            echo -e "${RED}✗ Referenced file missing: $link${NC}"
            ERRORS=$((ERRORS + 1))
            LINK_ERRORS=$((LINK_ERRORS + 1))
        fi
    done <<< "$LINKS"

    if [ $LINK_ERRORS -eq 0 ]; then
        echo -e "${GREEN}✓${NC} All file references valid"
    fi
else
    echo -e "${GREEN}✓${NC} No file references to validate"
fi
echo

# Check 7: Script files
echo -e "${BLUE}[Check 7/10]${NC} Checking script files..."
CHECKS=$((CHECKS + 1))

if [ -d "$SKILL_PATH/scripts" ]; then
    SCRIPT_COUNT=$(find "$SKILL_PATH/scripts" -type f | wc -l)
    echo -e "${GREEN}✓${NC} scripts/ directory found with $SCRIPT_COUNT file(s)"

    # Check script permissions
    for script in "$SKILL_PATH/scripts"/*; do
        if [ -f "$script" ]; then
            if [ -x "$script" ]; then
                echo -e "${GREEN}✓${NC} $(basename "$script") is executable"
            else
                echo -e "${YELLOW}⚠${NC} $(basename "$script") is not executable"
                WARNINGS=$((WARNINGS + 1))
            fi

            # Check for shebang
            if head -n 1 "$script" | grep -q "^#!"; then
                echo -e "${GREEN}✓${NC} $(basename "$script") has shebang"
            else
                echo -e "${YELLOW}⚠${NC} $(basename "$script") missing shebang"
                WARNINGS=$((WARNINGS + 1))
            fi
        fi
    done
else
    echo -e "${GREEN}✓${NC} No scripts directory (not required)"
fi
echo

# Check 8: Python syntax (if Python files exist)
echo -e "${BLUE}[Check 8/10]${NC} Checking Python syntax..."
CHECKS=$((CHECKS + 1))

if [ -d "$SKILL_PATH/scripts" ]; then
    PYTHON_FILES=$(find "$SKILL_PATH/scripts" -name "*.py" -type f)
    if [ -n "$PYTHON_FILES" ]; then
        if command -v python3 &> /dev/null; then
            SYNTAX_ERRORS=0
            while IFS= read -r pyfile; do
                if python3 -m py_compile "$pyfile" 2>/dev/null; then
                    echo -e "${GREEN}✓${NC} $(basename "$pyfile") syntax valid"
                else
                    echo -e "${RED}✗ $(basename "$pyfile") has syntax errors${NC}"
                    ERRORS=$((ERRORS + 1))
                    SYNTAX_ERRORS=$((SYNTAX_ERRORS + 1))
                fi
            done <<< "$PYTHON_FILES"
        else
            echo -e "${YELLOW}⚠${NC} python3 not found, skipping syntax check"
            WARNINGS=$((WARNINGS + 1))
        fi
    else
        echo -e "${GREEN}✓${NC} No Python files to validate"
    fi
else
    echo -e "${GREEN}✓${NC} No scripts to validate"
fi
echo

# Check 9: Bash syntax (if Bash files exist)
echo -e "${BLUE}[Check 9/10]${NC} Checking Bash syntax..."
CHECKS=$((CHECKS + 1))

if [ -d "$SKILL_PATH/scripts" ]; then
    BASH_FILES=$(find "$SKILL_PATH/scripts" -name "*.sh" -type f)
    if [ -n "$BASH_FILES" ]; then
        SYNTAX_ERRORS=0
        while IFS= read -r shfile; do
            if bash -n "$shfile" 2>/dev/null; then
                echo -e "${GREEN}✓${NC} $(basename "$shfile") syntax valid"
            else
                echo -e "${RED}✗ $(basename "$shfile") has syntax errors${NC}"
                ERRORS=$((ERRORS + 1))
                SYNTAX_ERRORS=$((SYNTAX_ERRORS + 1))
            fi
        done <<< "$BASH_FILES"
    else
        echo -e "${GREEN}✓${NC} No Bash files to validate"
    fi
else
    echo -e "${GREEN}✓${NC} No scripts to validate"
fi
echo

# Check 10: Security checks
echo -e "${BLUE}[Check 10/10]${NC} Running security checks..."
CHECKS=$((CHECKS + 1))

# Check for hardcoded credentials patterns
if grep -rE "(password|passwd|pwd|secret|token|api_key|apikey)[[:space:]]*=[[:space:]]*['\"][^'\"]+['\"]" "$SKILL_PATH" 2>/dev/null | grep -v ".git"; then
    echo -e "${YELLOW}⚠${NC} Possible hardcoded credentials found"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✓${NC} No obvious hardcoded credentials"
fi

# Check for eval/exec in scripts
if [ -d "$SKILL_PATH/scripts" ]; then
    if grep -rE "(eval|exec)\(" "$SKILL_PATH/scripts" 2>/dev/null; then
        echo -e "${YELLOW}⚠${NC} Found eval() or exec() - ensure input is sanitized"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "${GREEN}✓${NC} No eval() or exec() found"
    fi
fi
echo

# Summary
echo -e "${BLUE}==============================================================${NC}"
echo -e "${BLUE}Validation Summary${NC}"
echo -e "${BLUE}==============================================================${NC}"
echo -e "Checks performed: $CHECKS"
echo -e "${RED}Errors: $ERRORS${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo

if [ $ERRORS -eq 0 ]; then
    if [ $WARNINGS -eq 0 ]; then
        echo -e "${GREEN}✓ VALIDATION PASSED - Skill is production-ready!${NC}"
        exit 0
    else
        echo -e "${YELLOW}⚠ VALIDATION PASSED WITH WARNINGS${NC}"
        echo -e "Consider addressing warnings for optimal quality"
        exit 0
    fi
else
    echo -e "${RED}✗ VALIDATION FAILED${NC}"
    echo -e "Fix errors before using this skill"
    exit 1
fi
