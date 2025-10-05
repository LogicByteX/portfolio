#!/usr/bin/env node

/**
 * Resume Export Script
 * 
 * This script exports the portfolio resume as a PDF.
 * For now, it provides instructions for manual export.
 * 
 * Future implementation could use:
 * - Puppeteer for automated PDF generation
 * - react-to-print for client-side PDF generation
 */

console.log('\n📄 Resume Export Tool\n');
console.log('To export your resume as PDF:');
console.log('\n1. Manual Method:');
console.log('   - Open http://localhost:5173 in your browser');
console.log('   - Press Ctrl+P (Cmd+P on Mac)');
console.log('   - Select "Save as PDF"');
console.log('   - Save to public/resume.pdf');
console.log('\n2. Automated Method (requires setup):');
console.log('   - Install puppeteer: npm install --save-dev puppeteer');
console.log('   - Uncomment the puppeteer code below');
console.log('\n3. Current Resume:');
console.log('   - Located at: public/resume.pdf');
console.log('   - Update this file with your latest resume');
console.log('\n✅ Resume is ready for download from your portfolio!\n');

// Uncomment below for automated PDF generation with Puppeteer
/*
const puppeteer = require('puppeteer');
const path = require('path');

async function exportResume() {
  console.log('🚀 Starting automated PDF export...\n');
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the resume section
  await page.goto('http://localhost:5173', { 
    waitUntil: 'networkidle0' 
  });
  
  // Wait for content to load
  await page.waitForSelector('#about');
  
  // Generate PDF
  const pdfPath = path.join(__dirname, '../public/resume.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });
  
  await browser.close();
  
  console.log(`✅ Resume exported to: ${pdfPath}\n`);
}

exportResume().catch(console.error);
*/
