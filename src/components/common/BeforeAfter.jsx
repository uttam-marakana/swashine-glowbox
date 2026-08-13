import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

/**
 * Before & After viewer with optional image upload for OFF and ON states.
 * Uploaded images stay in browser memory (object URLs) until page leave.
 */
export default function BeforeAfter({
  title = 'Before & After',
  description = 'Upload your print or product photos to preview OFF vs ON lighting.',
  defaultOffSrc = null,
  defaultOnSrc = null,
  className = '',
}) {
  const [showOn, setShowOn] = useState(true);
  const [offSrc, setOffSrc] = useState(defaultOffSrc);
  const [onSrc, setOnSrc] = useState(defaultOnSrc);
  const offInputRef = useRef(null);
  const onInputRef = useRef(null);
  const offUrlRef = useRef(null);
  const onUrlRef = useRef(null);

  // Sync if parent default images change (e.g. product gallery)
  useEffect(() => {
    if (!offUrlRef.current) setOffSrc(defaultOffSrc);
  }, [defaultOffSrc]);
  useEffect(() => {
    if (!onUrlRef.current) setOnSrc(defaultOnSrc);
  }, [defaultOnSrc]);

  useEffect(() => {
    return () => {
      if (offUrlRef.current) URL.revokeObjectURL(offUrlRef.current);
      if (onUrlRef.current) URL.revokeObjectURL(onUrlRef.current);
    };
  }, []);

  const handleFile = (file, which) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    if (which === 'off') {
      if (offUrlRef.current) URL.revokeObjectURL(offUrlRef.current);
      offUrlRef.current = url;
      setOffSrc(url);
    } else {
      if (onUrlRef.current) URL.revokeObjectURL(onUrlRef.current);
      onUrlRef.current = url;
      setOnSrc(url);
    }
  };

  const clearUpload = (which) => {
    if (which === 'off') {
      if (offUrlRef.current) URL.revokeObjectURL(offUrlRef.current);
      offUrlRef.current = null;
      setOffSrc(defaultOffSrc);
      if (offInputRef.current) offInputRef.current.value = '';
    } else {
      if (onUrlRef.current) URL.revokeObjectURL(onUrlRef.current);
      onUrlRef.current = null;
      setOnSrc(defaultOnSrc);
      if (onInputRef.current) onInputRef.current.value = '';
    }
  };

  const activeSrc = showOn ? onSrc : offSrc;

  return (
    <section className={className}>
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">{title}</h2>
      <p className="text-zinc-400 text-center mb-8 max-w-lg mx-auto text-sm md:text-base">{description}</p>

      {/* Upload controls */}
      <div className="max-w-3xl mx-auto mb-6 grid sm:grid-cols-2 gap-4">
        {/* OFF upload */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">OFF image</span>
            {offSrc && offUrlRef.current && (
              <button type="button" onClick={() => clearUpload('off')} className="text-zinc-500 hover:text-red-400 transition" aria-label="Clear OFF image">
                <X size={16} />
              </button>
            )}
          </div>
          <input
            ref={offInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0], 'off')}
          />
          <button
            type="button"
            onClick={() => offInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-zinc-600 hover:border-red-400/60 text-sm text-zinc-400 hover:text-red-300 transition"
          >
            <Upload size={16} />
            {offSrc ? 'Change OFF photo' : 'Upload OFF photo'}
          </button>
        </div>

        {/* ON upload */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-green-400">ON image</span>
            {onSrc && onUrlRef.current && (
              <button type="button" onClick={() => clearUpload('on')} className="text-zinc-500 hover:text-red-400 transition" aria-label="Clear ON image">
                <X size={16} />
              </button>
            )}
          </div>
          <input
            ref={onInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0], 'on')}
          />
          <button
            type="button"
            onClick={() => onInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-zinc-600 hover:border-green-400/60 text-sm text-zinc-400 hover:text-green-300 transition"
          >
            <Upload size={16} />
            {onSrc ? 'Change ON photo' : 'Upload ON photo'}
          </button>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => setShowOn(false)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
            !showOn ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          OFF
        </button>
        <button
          type="button"
          onClick={() => setShowOn(true)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
            showOn ? 'bg-green-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          ON
        </button>
      </div>

      {/* Preview */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          key={showOn ? 'on' : 'off'}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className={`rounded-3xl border overflow-hidden aspect-[4/3] flex items-center justify-center ${
            showOn ? 'bg-zinc-800 border-green-500/30' : 'bg-zinc-900 border-zinc-700'
          }`}
        >
          {activeSrc ? (
            <img
              src={activeSrc}
              alt={showOn ? 'ON — illuminated' : 'OFF — unlit'}
              className={`max-h-full max-w-full object-contain p-6 transition ${
                showOn ? 'brightness-110' : 'brightness-75 opacity-90'
              }`}
            />
          ) : (
            <div className="text-center text-zinc-500 p-8">
              <ImageIcon size={48} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">
                {showOn ? 'Upload an ON (lit) photo to preview' : 'Upload an OFF (unlit) photo to preview'}
              </p>
            </div>
          )}
        </motion.div>
        <p className="text-center text-sm text-zinc-500 mt-4">
          {showOn
            ? 'ON — fully illuminated, vibrant colours'
            : 'OFF — print visible but not backlit'}
        </p>
        <p className="text-center text-xs text-zinc-600 mt-2">
          Images stay in your browser only — nothing is uploaded to our servers.
        </p>
      </div>
    </section>
  );
}
