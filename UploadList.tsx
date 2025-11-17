'use client';

import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { motion } from 'framer-motion';
import { Participant } from '@/types';

interface UploadListProps {
  onParticipantsLoaded: (participants: Participant[]) => void;
}

export const UploadList: React.FC<UploadListProps> = ({ onParticipantsLoaded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateParticipant = (p: any): p is Participant => {
    return (
      typeof p === 'object' &&
      p !== null &&
      typeof p.name === 'string' &&
      p.name.trim() !== '' &&
      typeof p.memory === 'string' &&
      typeof p.imageURL === 'string' &&
      p.imageURL.trim() !== ''
    );
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      let participants: Participant[] = [];

      if (fileExtension === 'json') {
        // Parse JSON
        try {
          const data = JSON.parse(text);
          if (!Array.isArray(data)) {
            throw new Error('El archivo JSON debe contener un array de participantes');
          }
          participants = data.filter(validateParticipant);
          if (participants.length === 0) {
            throw new Error('No se encontraron participantes válidos en el archivo JSON');
          }
        } catch (e) {
          throw new Error('Error al parsear el archivo JSON. Verifica el formato.');
        }
      } else if (fileExtension === 'csv') {
        // Parse CSV
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const validParticipants = results.data.filter(validateParticipant);
            if (validParticipants.length === 0) {
              setError('No se encontraron participantes válidos en el archivo CSV');
              setIsLoading(false);
              return;
            }
            participants = validParticipants as Participant[];
          },
          error: (error) => {
            setError(`Error al parsear CSV: ${error.message}`);
            setIsLoading(false);
            return;
          },
        });

        // Wait for Papa Parse to complete (hacky but works for sync parsing)
        await new Promise(resolve => setTimeout(resolve, 100));
      } else {
        throw new Error('Por favor, sube un archivo .json o .csv');
      }

      if (participants.length > 0) {
        onParticipantsLoaded(participants);
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar el archivo');
    } finally {
      setIsLoading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-blue to-wedding-blue-dark p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-12">
          <h1 className="font-playfair text-6xl md:text-7xl text-wedding-ochre mb-4">
            Ruleta de Recuerdos
          </h1>
          <p className="font-playfair text-3xl text-wedding-ivory">
            H 💍 R
          </p>
        </div>

        <div className="bg-wedding-ivory rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="font-playfair text-3xl text-wedding-blue mb-6 text-center">
            Bienvenidos
          </h2>
          
          <div className="space-y-4 mb-8">
            <p className="font-poppins text-wedding-blue text-center">
              Carga la lista de invitados para comenzar la ruleta de recuerdos.
            </p>
            <p className="font-poppins text-sm text-wedding-blue/70 text-center">
              Formatos aceptados: CSV o JSON con los campos: name, memory, imageURL
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isLoading}
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleButtonClick}
              disabled={isLoading}
              className="bg-wedding-ochre hover:bg-wedding-ochre-light text-wedding-ivory font-poppins font-semibold px-8 py-4 rounded-full text-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Cargando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  📁 Cargar lista (CSV / JSON)
                </span>
              )}
            </motion.button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md"
              >
                <p className="font-poppins text-sm">{error}</p>
              </motion.div>
            )}

            <div className="mt-8 pt-8 border-t border-wedding-blue/20 w-full">
              <p className="font-poppins text-xs text-wedding-blue/50 text-center">
                Puedes usar los archivos de ejemplo en /public/examples/
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
