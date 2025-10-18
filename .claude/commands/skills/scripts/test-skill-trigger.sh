#!/usr/bin/env bash
#
# Skill Trigger Testing Script
# Tests if a skill can be discovered and what triggers it
#
# Usage: ./test-skill-trigger.sh <skill-path>
# Example: ./test-skill-trigger.sh ~/.claude/skills/my-skill

set -e

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SKILL_PATH="${1}"

if [ -z "$SKILL_PATH" ]; then
    echo "Usage: $0 <skill-path>"
    exit 1
fi

if [ ! -d "$SKILL_PATH" ]; then
    echo "Error: Skill directory not found: $SKILL_PATH"
    exit 1
fi

# Find SKILL.md
if [ -f "$SKILL_PATH/SKILL.md" ]; then
    SKILL_FILE="$SKILL_PATH/SKILL.md"
elif [ -f "$SKILL_PATH/skill.md" ]; then
    SKILL_FILE="$SKILL_PATH/skill.md"
else
    echo "Error: SKILL.md not found"
    exit 1
fi

echo -e "${BLUE}==============================================================${NC}"
echo -e "${BLUE}Skill Trigger Analysis${NC}"
echo -e "${BLUE}==============================================================${NC}"
echo

# Extract metadata
FRONTMATTER=$(sed -n '/^---$/,/^---$/p' "$SKILL_FILE" | sed '1d;$d')

NAME=$(echo "$FRONTMATTER" | grep "^name:" | sed 's/name:[[:space:]]*//')
DESCRIPTION=$(echo "$FRONTMATTER" | grep "^description:" | sed 's/description:[[:space:]]*//')
ALLOWED_TOOLS=$(echo "$FRONTMATTER" | grep "^allowed-tools:" | sed 's/allowed-tools:[[:space:]]*//')

echo -e "${GREEN}Skill Name:${NC} $NAME"
echo -e "${GREEN}Description:${NC} $DESCRIPTION"
if [ -n "$ALLOWED_TOOLS" ]; then
    echo -e "${GREEN}Tool Restrictions:${NC} $ALLOWED_TOOLS"
fi
echo

# Extract trigger keywords from description
echo -e "${BLUE}Trigger Keyword Analysis:${NC}"
echo

# Common trigger phrases
echo -e "${YELLOW}Explicit 'Use when' phrases:${NC}"
echo "$DESCRIPTION" | grep -oiE "use when [^.]*" || echo "  None found"
echo

echo -e "${YELLOW}Explicit 'Use for' phrases:${NC}"
echo "$DESCRIPTION" | grep -oiE "use for [^.]*" || echo "  None found"
echo

echo -e "${YELLOW}Explicit 'Helps with' phrases:${NC}"
echo "$DESCRIPTION" | grep -oiE "helps with [^.]*" || echo "  None found"
echo

# Extract potential keywords (nouns and technical terms)
echo -e "${YELLOW}Potential Trigger Keywords:${NC}"
echo "$DESCRIPTION" | grep -oE '\b[A-Z][A-Za-z]+\b|\b[a-z]{4,}\b' | sort -u | head -20
echo

# Suggested test prompts
echo -e "${BLUE}==============================================================${NC}"
echo -e "${BLUE}Suggested Test Prompts${NC}"
echo -e "${BLUE}==============================================================${NC}"
echo

echo -e "${GREEN}1. Direct invocation:${NC}"
echo "   \"Use the $NAME skill to [describe task]\""
echo

echo -e "${GREEN}2. Implicit triggering (based on description):${NC}"

# Extract key phrases for implicit triggering
if echo "$DESCRIPTION" | grep -qi "PDF"; then
    echo "   \"Help me extract text from this PDF file\""
fi

if echo "$DESCRIPTION" | grep -qi "commit"; then
    echo "   \"Write a commit message for my changes\""
fi

if echo "$DESCRIPTION" | grep -qi "test"; then
    echo "   \"Generate tests for this component\""
fi

if echo "$DESCRIPTION" | grep -qi "security\|audit"; then
    echo "   \"Review this code for security issues\""
fi

if echo "$DESCRIPTION" | grep -qi "document\|docs"; then
    echo "   \"Create documentation for this API\""
fi

if echo "$DESCRIPTION" | grep -qi "database\|SQL"; then
    echo "   \"Help me optimize this database query\""
fi

if echo "$DESCRIPTION" | grep -qi "performance"; then
    echo "   \"Find performance bottlenecks in this code\""
fi

# Generic fallback
echo "   \"[Use keywords from the description]\""
echo

# Discoverability score
echo -e "${BLUE}==============================================================${NC}"
echo -e "${BLUE}Discoverability Assessment${NC}"
echo -e "${BLUE}==============================================================${NC}"
echo

SCORE=0
MAX_SCORE=10

# Check 1: Length (1-3 sentences ideal)
SENTENCE_COUNT=$(echo "$DESCRIPTION" | grep -o '\.' | wc -l)
if [ "$SENTENCE_COUNT" -ge 1 ] && [ "$SENTENCE_COUNT" -le 3 ]; then
    echo -e "${GREEN}✓${NC} Description length appropriate ($SENTENCE_COUNT sentences)"
    SCORE=$((SCORE + 2))
else
    echo -e "${YELLOW}⚠${NC} Description length could be improved ($SENTENCE_COUNT sentences)"
fi

# Check 2: Contains "use when" or similar
if echo "$DESCRIPTION" | grep -qiE "use when|use for|helps with|when working with"; then
    echo -e "${GREEN}✓${NC} Contains explicit trigger guidance"
    SCORE=$((SCORE + 3))
else
    echo -e "${YELLOW}⚠${NC} Missing explicit 'use when' guidance"
fi

# Check 3: Specific terms present
WORD_COUNT=$(echo "$DESCRIPTION" | wc -w)
if [ "$WORD_COUNT" -ge 15 ] && [ "$WORD_COUNT" -le 60 ]; then
    echo -e "${GREEN}✓${NC} Word count in optimal range ($WORD_COUNT words)"
    SCORE=$((SCORE + 2))
else
    echo -e "${YELLOW}⚠${NC} Word count could be improved ($WORD_COUNT words, aim for 15-60)"
fi

# Check 4: Dependencies mentioned if they exist
if [ -d "$SKILL_PATH/scripts" ]; then
    if echo "$DESCRIPTION" | grep -qiE "require|need|install|package|dependency"; then
        echo -e "${GREEN}✓${NC} Dependencies mentioned in description"
        SCORE=$((SCORE + 1))
    else
        echo -e "${YELLOW}⚠${NC} Has scripts but dependencies not mentioned"
    fi
else
    echo -e "${GREEN}✓${NC} No scripts to require dependencies"
    SCORE=$((SCORE + 1))
fi

# Check 5: Active voice
if echo "$DESCRIPTION" | grep -qiE "^[A-Z][a-z]+ |^Extract|^Generate|^Create|^Analyze"; then
    echo -e "${GREEN}✓${NC} Uses active voice"
    SCORE=$((SCORE + 2))
else
    echo -e "${YELLOW}⚠${NC} Consider using more active voice"
fi

echo
echo -e "${GREEN}Discoverability Score: $SCORE/$MAX_SCORE${NC}"

if [ $SCORE -ge 8 ]; then
    echo -e "${GREEN}Excellent! Skill should be easily discoverable${NC}"
elif [ $SCORE -ge 6 ]; then
    echo -e "${YELLOW}Good, but could be improved${NC}"
else
    echo -e "${YELLOW}Consider revising description for better discoverability${NC}"
fi

echo
echo -e "${BLUE}==============================================================${NC}"
