"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { UploadCloud, File, AlertCircle, CheckCircle, BarChart, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export default function PredictionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isPredicting, setIsPredicting] = useState(false)
  const [result, setResult] = useState<boolean>(false)

  const handlePredict = () => {
    setIsPredicting(true)
    setTimeout(() => {
      setIsPredicting(false)
      setResult(true)
    }, 2500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Prediction Engine</h1>
        <p className="text-muted-foreground">Upload project data (CSV/Excel) to receive risk, cost, and schedule forecasts.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Data Upload</CardTitle>
              <CardDescription>Drag and drop your project dataset to analyze.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div 
                className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer h-full min-h-[300px]"
                onClick={() => setFile(new File([], "project_data.csv"))}
              >
                {!file ? (
                  <>
                    <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-lg mb-1">Click or drag file to this area to upload</h3>
                    <p className="text-sm text-muted-foreground">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files.</p>
                  </>
                ) : (
                  <>
                    <File className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-1">project_data.csv</h3>
                    <p className="text-sm text-muted-foreground">1.4 MB • Ready for analysis</p>
                    <Button variant="ghost" size="sm" className="mt-4 text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); setFile(null) }}>Remove File</Button>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg" 
                disabled={!file || isPredicting || result}
                onClick={handlePredict}
              >
                {isPredicting ? "Analyzing Patterns..." : result ? "Analysis Complete" : "Generate Prediction"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="h-full bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>AI-generated forecast and risk analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              {!isPredicting && !result && (
                <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground text-center">
                  <BarChart className="h-16 w-16 mb-4 opacity-20" />
                  <p>Upload data and click "Generate Prediction"<br/>to see results here.</p>
                </div>
              )}

              {isPredicting && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                </div>
              )}

              {result && !isPredicting && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Overall Confidence Score</h3>
                      <div className="text-4xl font-bold mt-1 text-primary">87.4%</div>
                    </div>
                    <Badge variant="warning" className="text-sm px-3 py-1">High Risk</Badge>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold border-b pb-2">SHAP Feature Importance</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Material Cost Variance</span>
                          <span className="font-medium text-danger">+32% impact</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-danger w-[85%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Labor Availability</span>
                          <span className="font-medium text-warning">+18% impact</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-warning w-[60%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Weather Delays</span>
                          <span className="font-medium text-success">-5% impact</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-success w-[20%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-lg p-4">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      AI Recommendations
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                      <li>Lock in material prices within 14 days to mitigate variance risk.</li>
                      <li>Allocate 12% additional budget to contingency fund.</li>
                      <li>Review structural engineering phase timeline.</li>
                    </ul>
                    <Button variant="link" className="px-0 mt-2 gap-1 h-auto text-primary">
                      View Full Report <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
