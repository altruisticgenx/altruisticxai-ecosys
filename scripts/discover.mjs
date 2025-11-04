#!/usr/bin/env node

import { runEnrichedDiscovery } from '../src/data-ingest/orchestrator.js'
import { getDiscoveredProjects, getDiscoveredGrants, getLastRun } from '../src/data-ingest/store/storage.js'

const PRESETS = {
  energy: {
    keywords: ['energy', 'renewable', 'solar', 'wind', 'grid', 'efficiency', 'campus energy'],
    sectors: ['energy'],
    locations: ['Maine', 'New England'],
    relevance_threshold: 0.5
  },
  education: {
    keywords: ['education', 'university', 'college', 'campus', 'student', 'AI education'],
    sectors: ['education'],
    locations: ['Maine', 'New England', 'Massachusetts'],
    relevance_threshold: 0.4
  },
  ai: {
    keywords: ['AI', 'artificial intelligence', 'machine learning', 'local-first AI', 'edge AI'],
    sectors: ['research'],
    locations: ['New England'],
    relevance_threshold: 0.5
  },
  pilot: {
    keywords: ['pilot', 'demonstration', 'innovation', 'prototype', 'proof of concept'],
    sectors: ['energy', 'education', 'research'],
    locations: ['Maine', 'Vermont', 'New Hampshire'],
    relevance_threshold: 0.4
  },
  'new-england': {
    keywords: ['local government', 'municipal', 'city', 'town', 'regional'],
    sectors: ['energy', 'education', 'law'],
    locations: ['Maine', 'Vermont', 'New Hampshire', 'Massachusetts', 'Rhode Island', 'Connecticut'],
    relevance_threshold: 0.4
  }
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  
  console.log('🌟 AltruisticXAI Data Discovery CLI\n')
  
  if (command === 'status') {
    await showStatus()
  } else if (command === 'discover') {
    const preset = args[1] || 'pilot'
    const useAI = !args.includes('--no-ai')
    await runDiscovery(preset, useAI)
  } else if (command === 'list') {
    const type = args[1]
    await listRecords(type)
  } else if (command === 'presets') {
    showPresets()
  } else {
    showHelp()
  }
}

async function showStatus() {
  try {
    const [projects, grants, lastRun] = await Promise.all([
      getDiscoveredProjects(),
      getDiscoveredGrants(),
      getLastRun()
    ])
    
    console.log('📊 Discovery Status\n')
    console.log(`Total Projects: ${projects.length}`)
    console.log(`Total Grants: ${grants.length}`)
    console.log(`Last Run: ${lastRun ? new Date(lastRun).toLocaleString() : 'Never'}\n`)
    
    if (projects.length > 0) {
      const topProjects = projects
        .sort((a, b) => (b.relevance_score || 0) - (a.relevance_score || 0))
        .slice(0, 5)
      
      console.log('🎯 Top 5 Projects by Relevance:\n')
      topProjects.forEach((p, i) => {
        console.log(`${i + 1}. ${p.title}`)
        console.log(`   Score: ${((p.relevance_score || 0) * 100).toFixed(0)}%`)
        console.log(`   Sector: ${p.sector}`)
        console.log(`   Source: ${p.api_source}`)
        console.log(`   URL: ${p.url}\n`)
      })
    }
    
    if (grants.length > 0) {
      const topGrants = grants
        .sort((a, b) => (b.relevance_score || 0) - (a.relevance_score || 0))
        .slice(0, 5)
      
      console.log('💰 Top 5 Grants by Relevance:\n')
      topGrants.forEach((g, i) => {
        console.log(`${i + 1}. ${g.title}`)
        console.log(`   Score: ${((g.relevance_score || 0) * 100).toFixed(0)}%`)
        console.log(`   Agency: ${g.agency}`)
        console.log(`   Award: $${g.award_ceiling ? (g.award_ceiling / 1000).toFixed(0) + 'K' : 'TBD'}`)
        console.log(`   URL: ${g.url}\n`)
      })
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

async function runDiscovery(preset, useAI) {
  const filters = PRESETS[preset]
  
  if (!filters) {
    console.error(`❌ Unknown preset: ${preset}`)
    console.log('\nAvailable presets:')
    Object.keys(PRESETS).forEach(key => console.log(`  - ${key}`))
    process.exit(1)
  }
  
  console.log(`🔍 Running discovery with "${preset}" preset`)
  console.log(`AI Enrichment: ${useAI ? 'Enabled' : 'Disabled'}\n`)
  console.log('Filters:')
  console.log(`  Keywords: ${filters.keywords.join(', ')}`)
  console.log(`  Sectors: ${filters.sectors.join(', ')}`)
  console.log(`  Locations: ${filters.locations.join(', ')}`)
  console.log(`  Threshold: ${filters.relevance_threshold}\n`)
  
  try {
    console.log('⏳ Querying APIs...')
    const job = await runEnrichedDiscovery(filters, useAI)
    
    console.log(`\n✅ Discovery Complete!`)
    console.log(`Status: ${job.status}`)
    console.log(`Found: ${job.records_found} records`)
    console.log(`Imported: ${job.records_imported} records`)
    
    if (job.errors && job.errors.length > 0) {
      console.log(`\n⚠️  Errors: ${job.errors.length}`)
      job.errors.forEach(err => console.log(`  - ${err}`))
    }
    
    console.log('\nRun `npm run discover status` to see results')
  } catch (error) {
    console.error('❌ Discovery failed:', error.message)
    process.exit(1)
  }
}

async function listRecords(type) {
  try {
    if (type === 'projects') {
      const projects = await getDiscoveredProjects()
      console.log(`📦 ${projects.length} Projects\n`)
      projects.forEach((p, i) => {
        console.log(`${i + 1}. ${p.title}`)
        console.log(`   ${p.description.slice(0, 100)}...`)
        console.log(`   Sector: ${p.sector} | Score: ${((p.relevance_score || 0) * 100).toFixed(0)}%`)
        console.log(`   ${p.url}\n`)
      })
    } else if (type === 'grants') {
      const grants = await getDiscoveredGrants()
      console.log(`💰 ${grants.length} Grants\n`)
      grants.forEach((g, i) => {
        console.log(`${i + 1}. ${g.title}`)
        console.log(`   Agency: ${g.agency}`)
        console.log(`   Award: $${g.award_ceiling ? (g.award_ceiling / 1000).toFixed(0) + 'K' : 'TBD'}`)
        console.log(`   Close: ${g.close_date ? new Date(g.close_date).toLocaleDateString() : 'TBD'}`)
        console.log(`   ${g.url}\n`)
      })
    } else {
      console.log('Specify type: projects or grants')
      console.log('Example: npm run discover list projects')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

function showPresets() {
  console.log('📋 Available Discovery Presets\n')
  Object.entries(PRESETS).forEach(([key, config]) => {
    console.log(`${key}:`)
    console.log(`  Keywords: ${config.keywords.slice(0, 3).join(', ')}...`)
    console.log(`  Sectors: ${config.sectors.join(', ')}`)
    console.log(`  Locations: ${config.locations.slice(0, 2).join(', ')}...\n`)
  })
  console.log('Usage: npm run discover discover <preset>')
  console.log('Example: npm run discover discover energy')
}

function showHelp() {
  console.log('Usage: npm run discover <command> [options]\n')
  console.log('Commands:')
  console.log('  status              Show current discovery status and top results')
  console.log('  discover <preset>   Run discovery with a preset (energy, education, ai, pilot, new-england)')
  console.log('  discover <preset> --no-ai   Run without AI enrichment')
  console.log('  list projects       List all discovered projects')
  console.log('  list grants         List all discovered grants')
  console.log('  presets             Show available discovery presets')
  console.log('\nExamples:')
  console.log('  npm run discover status')
  console.log('  npm run discover discover energy')
  console.log('  npm run discover discover pilot --no-ai')
  console.log('  npm run discover list grants')
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
