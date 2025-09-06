---
tools:
  - read
  - write
  - bash
arguments: $FILENAME
---

# Semantic Tree Export

Export the active semantic tree to a file for backup, sharing, or transfer to another system.

Based on the WFGY project: https://github.com/onestardao/WFGY

## Instructions

1. **Prepare Export**
   - Parse filename from "$FILENAME" (default: "[tree_name]_[timestamp].txt")
   - Validate export format from extension:
     * `.txt`: Plain text format (default)
     * `.json`: Full JSON structure
     * `.md`: Markdown report
   - Read active tree from `.wfgy/trees/active_tree.json`
   - Calculate tree statistics for header

2. **Format Tree Data (TXT Format)**
   ```
   WFGY Semantic Tree Export v1.0
   ═══════════════════════════════════════
   Tree: [name]
   Exported: [timestamp]
   Nodes: [count]
   
   Node Format:
   [ID] | [Timestamp] | [Topic] | [Module] | [ΔS] | [λ] | [Insight]
   ─────────────────────────────────────────────────────────────────
   
   node_001 | 2024-01-15T10:00:00Z | Tree Init | SYSTEM | 0.00 | → | System initialized
   node_002 | 2024-01-15T10:05:00Z | Design API | BBMC | 0.45 | → | RESTful architecture chosen
   node_003 | 2024-01-15T10:10:00Z | Auth System | BBPF | 0.72 | ← | Exploring OAuth vs JWT
   ```

3. **Format Tree Data (JSON Format)**
   ```json
   {
     "version": "1.0.0",
     "export_date": "ISO_8601",
     "tree": {
       "name": "tree_name",
       "id": "tree_id",
       "metadata": {...},
       "nodes": [
         {
           "id": "node_id",
           "topic": "topic",
           "module": "BBMC",
           "deltaS": 0.45,
           "lambda": "→",
           "insight": "...",
           "relationships": {...}
         }
       ],
       "checkpoints": [...],
       "statistics": {...}
     }
   }
   ```

4. **Format Tree Data (Markdown Format)**
   ```markdown
   # Semantic Tree: [Name]
   
   **Exported:** [timestamp]  
   **Total Nodes:** [count]  
   **Average ΔS:** [value]
   
   ## Tree Structure
   
   ### Root: Initialization
   - **Node 1** [ΔS: 0.45] Topic (BBMC)
     - Insight: Description...
     - **Node 2** [ΔS: 0.32] Subtopic (BBAM)
       - Insight: Description...
   
   ## Key Insights
   1. Major finding from node X...
   2. Critical decision at node Y...
   
   ## Statistics
   - Module usage: BBMC (40%), BBPF (30%)...
   ```

5. **Write Export File**
   - Create export in `./exports/` directory
   - Include metadata header
   - Write all nodes with relationships
   - Add statistics summary
   - Include configuration snapshot
   - Log export in `.wfgy/logs/exports.log`

6. **Verify Export**
   - Check file integrity
   - Validate all nodes included
   - Ensure relationships preserved
   - Test reimport compatibility
   - Generate checksum for verification

## Output Format

```
Semantic Tree Export Complete
═══════════════════════════════════════
Tree: [name]
Format: [TXT/JSON/MD]
Filename: $FILENAME
Location: ./exports/$FILENAME

Export Statistics:
- Nodes Exported: [count]
- File Size: [size]
- Checksum: [SHA256]

Content Summary:
- Time Range: [first_node] to [last_node]
- Modules Used: [list]
- Average ΔS: [value]
- Max Depth: [value]

Export Verification: ✓ Passed

Usage:
To reimport this tree later:
/semantic:tree-import "$FILENAME"

To share with another system:
Transfer $FILENAME and use tree-import
```

## Export Options

```bash
# Export with custom name
/semantic:tree-export "my_project_backup.txt"

# Export as JSON
/semantic:tree-export "tree_data.json"

# Export as Markdown report
/semantic:tree-export "tree_report.md"

# Export with compression (large trees)
/semantic:tree-export "tree.txt" --compress

# Export specific date range
/semantic:tree-export "recent.txt" --from "2024-01-01" --to "2024-01-31"
```

## File Formats

### Plain Text (Recommended)
- Maximum compatibility
- Human-readable
- Easy to audit
- Compact size

### JSON
- Full data preservation
- Programmatic access
- Relationship details
- Larger file size

### Markdown
- Formatted report
- Visual hierarchy
- Good for documentation
- Not for reimport

## Sharing Trees

Exported trees can be:
- Shared with team members
- Backed up for recovery
- Transferred between systems
- Analyzed externally
- Version controlled in git