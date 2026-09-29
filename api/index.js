
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Home
app.get("/", (req, res) => {
  res.json({
    message: "Library Loan REST API is running",
    endpoints: {
      getAll: "GET /loans",
      getById: "GET /loans/:id",
      create: "POST /loans",
      update: "PUT /loans/:id",
      delete: "DELETE /loans/:id",
      filter: "GET /loans?status=Terlambat"
    }
  });
});

// READ - semua data + filter status
app.get("/loans", async (req, res) => {
  try {
    const { status } = req.query;

    let query = supabase
      .from("loans")
      .select("*")
      .order("id", { ascending: true });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// READ - berdasarkan ID
app.get("/loans/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka"
      });
    }

    const { data, error } = await supabase
      .from("loans")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Data peminjaman tidak ditemukan"
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// CREATE
app.post("/loans", async (req, res) => {
  try {
    const {
      member_name,
      book_title,
      borrow_date,
      due_date,
      return_date,
      status
    } = req.body;

    if (!member_name || !book_title || !borrow_date || !due_date || !status) {
      return res.status(400).json({
        success: false,
        message: "member_name, book_title, borrow_date, due_date, dan status wajib diisi"
      });
    }

    const { data, error } = await supabase
      .from("loans")
      .insert([
        {
          member_name,
          book_title,
          borrow_date,
          due_date,
          return_date: return_date || null,
          status
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Data peminjaman berhasil ditambahkan",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE
app.put("/loans/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka"
      });
    }

    const {
      member_name,
      book_title,
      borrow_date,
      due_date,
      return_date,
      status
    } = req.body;

    const { data, error } = await supabase
      .from("loans")
      .update({
        member_name,
        book_title,
        borrow_date,
        due_date,
        return_date: return_date || null,
        status
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Data peminjaman tidak ditemukan atau gagal diperbarui"
      });
    }

    res.json({
      success: true,
      message: "Data peminjaman berhasil diperbarui",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE
app.delete("/loans/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka"
      });
    }

    const { data, error } = await supabase
      .from("loans")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Data peminjaman tidak ditemukan"
      });
    }

    res.json({
      success: true,
      message: "Data peminjaman berhasil dihapus",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
